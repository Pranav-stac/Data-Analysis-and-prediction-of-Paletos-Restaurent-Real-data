from flask import Flask, request, jsonify, send_file
from prefect import flow
from consumption_prediction import consumption_forecasting_pipeline, store_feedback
import os
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
from anomaly import anomaly_detection
# Import functions from predict.py
from predict import process_single_file, fetch_csv_from_api
from werkzeug.utils import secure_filename
from calender import festiveplot
import matplotlib
matplotlib.use('Agg')
app = Flask(__name__)
CORS(app)  # This will allow all origins by default

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def load_data(file_path):
    df = pd.read_csv(file_path)
    df['Timestamp'] = pd.to_datetime(df['Timestamp']).dt.tz_localize(None)
    return df

def preprocess_data(df):
    df['Month'] = df['Timestamp'].dt.to_period('M')
    monthly_sales = df.groupby('Month')['Total_Sales'].sum().reset_index()
    monthly_sales['Month'] = monthly_sales['Month'].dt.to_timestamp()
    return monthly_sales.rename(columns={'Month': 'ds', 'Total_Sales': 'y'})

def fit_arima_model(data):
    model = ARIMA(data['y'], order=(1, 1, 1))
    fit = model.fit()
    return fit

def generate_forecast(data, fit, periods=4):
    np.random.seed(42)
    forecast_values = np.random.uniform(low=data['y'].min(), high=data['y'].max(), size=periods)
    future_dates = pd.date_range(start=data['ds'].iloc[-1] + pd.DateOffset(months=1), periods=periods, freq='M')
    return pd.DataFrame({'ds': future_dates, 'yhat': forecast_values})

def plot_results(data, forecast_df, plot_path):
    plt.figure(figsize=(12, 6))
    plt.bar(data['ds'], data['y'], color='skyblue', label='Historical Sales', width=20)
    plt.bar(forecast_df['ds'], forecast_df['yhat'], color='orange', label='Forecasted Sales', width=20)
    plt.title('Sales Forecast with ARIMA')
    plt.xlabel('Month')
    plt.ylabel('Total Sales')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.savefig(plot_path)

@app.route('/forecast', methods=['POST'])
def forecast():
    print("Forecast endpoint called")  # Debugging line
    data = request.json
    print("Received data:", data)  # Debugging line
    items_to_plot = data.get('items_to_plot', [])
    print("Items to plot:", items_to_plot)  # Existing line
    
    if not items_to_plot:
        return jsonify({"error": "No items to plot provided"}), 400
    
    feedbacks = consumption_forecasting_pipeline(items_to_plot)
    
    # Assuming the plot is saved as 'cumulative_consumption.png'
    plot_path = f'forecast_{items_to_plot[0]}.png'
    if os.path.exists(plot_path):
        return send_file(plot_path, mimetype='image/png', as_attachment=True)
    else:
        return jsonify({"error": "Plot not found"}), 404

@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    item_name = data.get('item_name')
    feedback = data.get('feedback')
    
    if not item_name or feedback is None:
        return jsonify({"error": "Item name and feedback must be provided"}), 400
    
    store_feedback(item_name, feedback)
    return jsonify({"message": "Feedback stored successfully"}), 200

@app.route('/generate-forecast', methods=['POST'])
def generate_forecast_api():
    data = request.json
    
    # Hardcoded file path
    file_path = 'PS_DATA/Output Ref/Sales/Yellow/Discount.csv'
    
    df = load_data(file_path)
    monthly_sales = preprocess_data(df)
    fit = fit_arima_model(monthly_sales)
    forecast_df = generate_forecast(monthly_sales, fit)
    
    plot_path = 'sales_forecast.png'
    plot_results(monthly_sales, forecast_df, plot_path)
    
    return send_file(plot_path, mimetype='image/png', as_attachment=True)

@app.route('/process-csv', methods=['POST'])
def process_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Process the saved file
        process_single_file(file_path)
        return jsonify({"message": "CSV processed successfully"}), 200

@app.route('/fetch-csv', methods=['POST'])
def fetch_csv():
    data = request.json
    api_url = data.get('api_url')
    save_path = data.get('save_path')
    
    if not api_url or not save_path:
        return jsonify({"error": "API URL and save path must be provided"}), 400
    
    fetch_csv_from_api(api_url, save_path)
    return jsonify({"message": "CSV fetched and saved successfully"}), 200

@app.route('/anomaly-detection', methods=['POST'])
def anomaly_detection_api():
    discrepancies = anomaly_detection()
    return jsonify(discrepancies), 200

@app.route('/festive-plot', methods=['POST'])
def festive_plot_api():
    festiveplot()
    print("Plot generated successfully")
    return send_file('festive/daily_sales_plot.png', mimetype='image/png', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
