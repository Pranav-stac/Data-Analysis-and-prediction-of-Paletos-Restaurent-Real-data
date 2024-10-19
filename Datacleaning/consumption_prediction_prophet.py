import pandas as pd
import matplotlib.pyplot as plt
from prophet import Prophet

# Load consumption data
combined_consumption = pd.read_csv('PS_DATA/Prepared from Raw/COMBINED_CONSUMPTION.csv')
consumption_report = pd.read_csv('PS_DATA/Prepared from Raw/Consumption_Report.csv')

# Combine consumption data
combined_data = pd.concat([combined_consumption[['Date', 'Item_Name', 'Qty_']],
                           consumption_report[['Date', 'Item_Name', 'Qty_']]])

# Convert 'Date' to datetime
combined_data['Date'] = pd.to_datetime(combined_data['Date'])

# Group by item and date to get daily consumption
daily_consumption = combined_data.groupby(['Item_Name', combined_data['Date'].dt.date])['Qty_'].sum().reset_index()

# Function to predict future consumption using Prophet
def predict_with_prophet(item_name, periods=30):
    item_data = daily_consumption[daily_consumption['Item_Name'] == item_name]
    item_data = item_data.rename(columns={'Date': 'ds', 'Qty_': 'y'})
    
    # Initialize and fit the model
    model = Prophet()
    model.fit(item_data[['ds', 'y']])
    
    # Create a dataframe to hold predictions
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    
    # Plot the forecast
    fig = model.plot(forecast)
    plt.title(f'Consumption Forecast for {item_name}')
    plt.xlabel('Date')
    plt.ylabel('Consumption')
    
    # Save the plot to a file
    plt.savefig(f'{item_name}_consumption_forecast.png')

# Example usage
predict_with_prophet('AGLIO OLIO')
