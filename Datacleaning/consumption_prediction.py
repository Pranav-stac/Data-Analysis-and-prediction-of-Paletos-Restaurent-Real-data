import pandas as pd
import matplotlib.pyplot as plt

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

# Calculate cumulative consumption over time
daily_consumption['Cumulative_Consumption'] = daily_consumption.groupby('Item_Name')['Qty_'].cumsum()

print(daily_consumption)

# Filter for a specific item or a few items to plot
items_to_plot = ['AGLIO OLIO', 'Zafrani Rath Aloo']
filtered_data = daily_consumption[daily_consumption['Item_Name'].isin(items_to_plot)]

# Plot cumulative consumption over time
plt.figure(figsize=(12, 6))
for item in items_to_plot:
    item_data = filtered_data[filtered_data['Item_Name'] == item]
    plt.plot(item_data['Date'], item_data['Cumulative_Consumption'], label=item)

plt.title('Cumulative Consumption Over Time')
plt.xlabel('Date')
plt.ylabel('Cumulative Consumption')
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()

# Save the plot to a file
plt.savefig('cumulative_consumption.png')
