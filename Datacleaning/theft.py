import pandas as pd
import matplotlib.pyplot as plt

# Load the CSV file into a DataFrame
file_path = 'PS_DATA/Prepared from Raw/Bill_Settlement_Report.csv'
data = pd.read_csv(file_path)

# Display the first few rows of the DataFrame
print(data.head())

# Example: Plotting the total amount settled over time
# Ensure the 'Last_Settlement_Date' column is in datetime format
data['Last_Settlement_Date'] = pd.to_datetime(data['Last_Settlement_Date'], errors='coerce')

# Group by date and sum the total settled amount
daily_settled = data.groupby(data['Last_Settlement_Date'].dt.date)['Settled_Total'].sum()

# Plot the data
plt.figure(figsize=(10, 6))
plt.plot(daily_settled.index, daily_settled.values, marker='o')
plt.title('Total Amount Settled Over Time')
plt.xlabel('Date')
plt.ylabel('Total Amount Settled')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
