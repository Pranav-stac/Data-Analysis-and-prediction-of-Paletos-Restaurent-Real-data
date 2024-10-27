import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import tkinter as tk
from tkinter import ttk
import matplotlib.dates as mdates
import numpy as np
import matplotlib
matplotlib.use('Agg')
def load_consumption_data():
    combined_consumption = pd.read_csv('PS_DATA/Prepared from Raw/COMBINED_CONSUMPTION.csv')
    consumption_report = pd.read_csv('PS_DATA/Prepared from Raw/Consumption_Report.csv')
    combined_data = pd.concat([combined_consumption[['Date', 'Item_Name', 'Qty_']],
                               consumption_report[['Date', 'Item_Name', 'Qty_']]])
    combined_data['Date'] = pd.to_datetime(combined_data['Date'])
    return combined_data

def calculate_daily_expenses(combined_data):
    daily_expenses = combined_data.groupby(combined_data['Date'].dt.date)['Qty_'].sum().reset_index()
    daily_expenses.rename(columns={'Qty_': 'Daily_Expense'}, inplace=True)
    daily_expenses['Date'] = pd.to_datetime(daily_expenses['Date'])
    daily_expenses['Cumulative_Daily_Expense'] = daily_expenses['Daily_Expense'].cumsum()
    return daily_expenses

def load_festival_data():
    festive_data = pd.read_csv('PS_DATA/festive.csv')
    festive_data['From'] = pd.to_datetime(festive_data['From'], format='%d-%m-%Y')
    festive_data['To'] = pd.to_datetime(festive_data['To'], format='%d-%m-%Y')
    return festive_data

def plot_sales(daily_expenses, festive_data):
    root = tk.Tk()
    root.title("Fixed Daily Sales Plot")

    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(daily_expenses['Date'], daily_expenses['Daily_Expense'], label='Daily Sales', color='gray', alpha=0.5)
    ax.set_title('Overall Daily Sales Over Time (Jan 2024 - Dec 2024)')
    ax.set_xlabel('Date')
    ax.set_ylabel('Daily Sales')

    religion_colors = {
        'Hindu': 'orange',
        'Christianity': 'blue',
        'Islam': 'green',
        'Jain': 'purple'
    }

    # Plot festivals with random highlights around peak
    for religion, color in religion_colors.items():
        religion_dates = festive_data[festive_data['Religion'] == religion]['From']
        for date in religion_dates:
            if date < pd.to_datetime('2024-11-01'):  # For dates with sales data (till October)
                date_range = daily_expenses[(daily_expenses['Date'] >= date - pd.Timedelta(days=5)) & 
                                            (daily_expenses['Date'] <= date + pd.Timedelta(days=5))]
                if not date_range.empty:
                    peak_value = date_range['Daily_Expense'].max()

                    # Highlight a few points around the peak (both below and in between)
                    highlight_dates = date_range.sample(n=min(3, len(date_range)))  # Random 3 points if possible
                    for idx, row in highlight_dates.iterrows():
                        ax.plot(row['Date'], row['Daily_Expense'], color=color, marker='o', alpha=0.7)

            else:  # For festivals in November and December
                random_y = np.random.uniform(1000, 5000)  # Random y-axis value for plotting
                ax.plot(date, random_y, color=color, marker='o', label=f'{religion} Festival')

    # Add legend for religions
    for religion, color in religion_colors.items():
        ax.plot([], [], color=color, label=religion)

    ax.legend()

    # Set x-axis to display Jan 2024 - Dec 2024
    ax.set_xlim(pd.to_datetime('2024-01-01'), pd.to_datetime('2024-12-31'))

    ax.xaxis.set_major_locator(mdates.MonthLocator())
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %Y'))
    fig.autofmt_xdate()

    # Save the plot in the 'festive' folder
    plt.savefig('festive/daily_sales_plot.png')

    canvas = FigureCanvasTkAgg(fig, master=root)
    canvas_widget = canvas.get_tk_widget()
    canvas_widget.pack(side=tk.TOP, fill=tk.BOTH, expand=1)

    # root.mainloop()  # Commented out to prevent the plot window from opening

def festiveplot():
    combined_data = load_consumption_data()
    daily_expenses = calculate_daily_expenses(combined_data)
    festive_data = load_festival_data()
    plot_sales(daily_expenses, festive_data)



