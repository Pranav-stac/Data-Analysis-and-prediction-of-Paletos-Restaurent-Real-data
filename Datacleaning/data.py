import pandas as pd
import os

# Path to the directory containing the files
prepared_data_path = 'PS_DATA/Prepared from Raw'

# List of files to explore
files = [
    'Bill_Settlement_Report.csv',
    'CancelOrder_Summary_Item_Report.csv',
    'Category_Consumption.csv',
    'COMBINED_CONSUMPTION.csv',
    'Consumption_Report.csv',
    'KOT_AUDIT_DATA.csv',
    'KOT_MASTERDATA.csv',
    'KOT_Report_Modifications_Of_Item.csv',
    'Order_report_After_Print_Modification.csv',
    'Restaurants_order_discounted_summary.csv',
    'SALES_MASTERDATA_AUDIT.csv',
    'SALES_MASTERDATA.csv',
    'SWIGGY_MASTERDATA.csv',
    'ZOMATO_MASTERDATA.csv'
]

# Function to read and display the first few rows and info of each file
def read_and_explore(file_name):
    file_path = os.path.join(prepared_data_path, file_name)
    try:
        # Read the file as a CSV
        data = pd.read_csv(file_path)
        print(f"File: {file_name}")
        print(data.head())  # Display the first few rows
        print(data.info())  # Display information about the DataFrame
        print("\n")
    except Exception as e:
        print(f"Could not read {file_name}: {e}")

# Iterate over each file and explore
for file in files:
    read_and_explore(file)