from prefect import task, flow
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import numpy as np
import csv
import os

@task
def read_data():
    combined_data = pd.read_csv('OutputNew/Sales/Green/combined_consumption_data.csv')
    combined_data['Date'] = pd.to_datetime(combined_data['Date'])
    return combined_data

@task
def process_data(combined_data):
    daily_consumption = combined_data.groupby(['Item_Name', combined_data['Date'].dt.date])['Qty_'].sum().reset_index()
    daily_consumption['Cumulative_Consumption'] = daily_consumption.groupby('Item_Name')['Qty_'].cumsum()
    return daily_consumption

@task
def filter_data(daily_consumption, items_to_plot):
    return daily_consumption[daily_consumption['Item_Name'].isin(items_to_plot)]

@task
def plot_cumulative_consumption(filtered_data, items_to_plot):
    plt.figure(figsize=(12, 6))
    for item in items_to_plot:
        item_data = filtered_data[filtered_data['Item_Name'] == item]
        plt.plot(item_data['Date'], item_data['Cumulative_Consumption'], label=item)
 # Close the plot to free up resources

@task
def collect_feedback_from_frontend(item_name, feedback):
    # Assuming feedback is already validated on the front-end
    return feedback

@task
def store_feedback(item_name, feedback):
    with open('feedback.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([item_name, feedback])

@task
def count_feedback_entries():
    if not os.path.exists('feedback.csv'):
        return 0
    with open('feedback.csv', mode='r') as file:
        reader = csv.reader(file)
        feedback_entries = list(reader)
    return len(feedback_entries)

@task
def forecast_consumption_with_feedback(item_data, item_name, model_order=(5, 1, 0)):
    item_data = item_data.set_index('Date')
    train_size = int(len(item_data) * 0.8)
    train, test = item_data['Cumulative_Consumption'][:train_size], item_data['Cumulative_Consumption'][train_size:]
    model = ARIMA(train, order=model_order)
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=len(test))
    error = mean_squared_error(test, forecast)
    print(f'{item_name} Test MSE: {error}')
    plt.figure(figsize=(12, 6))
    # Plot only the training data for actual values0
    plt.plot(item_data.index[:train_size], train, label='Actual (Train)')
    plt.plot(item_data.index[train_size:], forecast, label='Forecast', color='red')
    plt.title(f'Cumulative Consumption Forecast for {item_name}')
    plt.xlabel('Date')
    plt.ylabel('Cumulative Consumption')
    plt.legend()
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(f'forecast_{item_name}.png')
    plt.close()
    return forecast

@task
def retrain_model_if_needed(feedback_count, item_data, item_name, model_order=(5, 1, 0)):
    if feedback_count >= 10:
        print(f"Retraining model for {item_name} due to sufficient feedback.")
        item_data = item_data.set_index('Date')
        model = ARIMA(item_data['Cumulative_Consumption'], order=model_order)
        model_fit = model.fit()
        return model_fit
    else:
        print(f"Not enough feedback to retrain model for {item_name}.")
        return None

@flow(name="Consumption Forecasting Pipeline with Feedback")
def consumption_forecasting_pipeline(items_to_plot):
    combined_data = read_data()
    daily_consumption = process_data(combined_data)
    filtered_data = filter_data(daily_consumption, items_to_plot)
    plot_cumulative_consumption(filtered_data, items_to_plot)
    feedback_count = count_feedback_entries()
    
    feedbacks = []  # Initialize an empty list to collect feedbacks

    for item in items_to_plot:
        item_data = filtered_data[filtered_data['Item_Name'] == item]
        forecast = forecast_consumption_with_feedback(item_data, item)
        
        # Collect feedback after forecasting
        # Feedback collection is now handled via the API
        feedbacks.append(None)  # Placeholder for feedback

    return feedbacks  # Return collected feedbacks

# To run the flow
# if __name__ == "__main__":
#     # Example: items and feedbacks would be provided by the front-end
#     items_to_plot = ['AGLIO OLIO', 'Zafrani Rath Aloo', 'TEA']
#     feedbacks = [4, 5, 3]  # Example feedbacks from the front-end
#     consumption_forecasting_pipeline(items_to_plot)
