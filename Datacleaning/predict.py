import pandas as pd

def calculate_Sales_Performance_Metrics():
    # Load the data
    bill_settlement_df = pd.read_csv('PS_DATA/Prepared from Raw/Bill_Settlement_Report.csv')
    cancel_order_summary_df = pd.read_csv('PS_DATA/Prepared from Raw/CancelOrder_Summary_Item_Report.csv')

    # Calculate Total_Bills
    total_bills = bill_settlement_df['Invoice_No_'].nunique()

    # Calculate Total_Sales
    total_sales = bill_settlement_df['Order_Total'].sum()

    # Calculate Total_Items_Sold
    total_items_sold = cancel_order_summary_df['item_quantity'].sum()

    # Calculate Average_Per_Bill
    average_per_bill = total_sales / total_bills if total_bills else 0

    # Calculate Average_Selling_Price
    average_selling_price = total_sales / total_items_sold if total_items_sold else 0

    # Prepare the result DataFrame
    staff_list = bill_settlement_df['Biller'].unique()
    result_data = {
        'Staff': staff_list,
        'Total_Bills': [total_bills] * len(staff_list),
        'Total_Items_Sold': [total_items_sold] * len(staff_list),
        'Total_Sales': [total_sales] * len(staff_list),
        'Average_Per_Bill': [average_per_bill] * len(staff_list),
        'Average_Per_Cover': [None] * len(staff_list),  # Placeholder as data is not available
        'Average_Selling_Price': [average_selling_price] * len(staff_list)
    }
    result_df = pd.DataFrame(result_data)

    # Save the result to a CSV file
    result_df.to_csv('Sales_Performance_Metrics.csv', index=False)
    print("Metrics calculated and saved to 'Sales_Performance_Metrics.csv'")

if __name__ == "__main__":
    calculate_metrics()
