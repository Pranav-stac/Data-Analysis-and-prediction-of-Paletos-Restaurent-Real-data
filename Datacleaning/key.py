import pandas as pd

# Load data
category_consumption = pd.read_csv('PS_DATA/Prepared from Raw/Category_Consumption.csv')
combined_consumption = pd.read_csv('PS_DATA/Prepared from Raw/COMBINED_CONSUMPTION.csv')
consumption_report = pd.read_csv('PS_DATA/Prepared from Raw/Consumption_Report.csv')

# Convert 'Date' to datetime
combined_consumption['Date'] = pd.to_datetime(combined_consumption['Date'])
consumption_report['Date'] = pd.to_datetime(consumption_report['Date'])

# Merge DataFrames on 'Date' and 'Item_Name'
merged_consumption = pd.merge(combined_consumption, consumption_report, on=['Date', 'Item_Name'], how='outer')