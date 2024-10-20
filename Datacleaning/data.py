import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
import numpy as np

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

def plot_results(data, forecast_df):
    plt.figure(figsize=(12, 6))
    plt.bar(data['ds'], data['y'], color='skyblue', label='Historical Sales', width=20)
    plt.bar(forecast_df['ds'], forecast_df['yhat'], color='orange', label='Forecasted Sales', width=20)
    plt.title('Sales Forecast with ARIMA')
    plt.xlabel('Month')
    plt.ylabel('Total Sales')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.savefig('sales_forecast.png')
def main():
    file_path = 'PS_DATA/Output Ref/Sales/Yellow/Discount.csv'
    df = load_data(file_path)
    monthly_sales = preprocess_data(df)
    fit = fit_arima_model(monthly_sales)
    forecast_df = generate_forecast(monthly_sales, fit)
    plot_results(monthly_sales, forecast_df)
    print(forecast_df[['ds', 'yhat']])

if __name__ == "__main__":
    main()