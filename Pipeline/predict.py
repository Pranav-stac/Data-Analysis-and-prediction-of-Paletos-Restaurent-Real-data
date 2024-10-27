import pandas as pd
import os
import requests
from scipy.stats import zscore

def find_best_match(input_csv, csv_files):
    input_df = pd.read_csv(input_csv)
    input_columns = set(input_df.columns)

    best_match_file = None
    max_matches = 0
    best_match_columns = []

    for csv_file in csv_files:
        try:
            df = pd.read_csv(csv_file)
            columns = set(df.columns)
            matches = len(input_columns.intersection(columns))

            if matches > max_matches:
                max_matches = matches
                best_match_file = csv_file
                best_match_columns = list(columns.intersection(input_columns))
        except Exception as e:
            print(f"Error reading {csv_file}: {e}")

    return best_match_file, best_match_columns

def evaluate_severity(input_df):
    # Calculate missing values percentage
    missing_percentage = input_df.isnull().mean().mean() * 100

    # Example outlier detection using Z-score
    numeric_cols = input_df.select_dtypes(include='number')
    z_scores = numeric_cols.apply(zscore)
    outliers = (z_scores.abs() > 3).sum().sum()

    # Define severity based on criteria
    if missing_percentage > 20 or outliers > 50:
        return 'Red'  # High severity
    elif missing_percentage > 10 or outliers > 20:
        return 'Orange'  # Medium severity
    else:
        return 'Green'  # Low severity

def clean_data(input_df):
    # Handle null values by replacing them with the mean of the column
    numeric_cols = input_df.select_dtypes(include='number')
    input_df[numeric_cols.columns] = numeric_cols.fillna(numeric_cols.mean())

    # Normalize numeric data
    input_df[numeric_cols.columns] = numeric_cols.apply(zscore)

    # Normalize date and time data
    datetime_cols = input_df.select_dtypes(include=['datetime', 'object']).columns
    for col in datetime_cols:
        try:
            input_df[col] = pd.to_datetime(input_df[col], errors='coerce')
            # Example: Extract year, month, day, etc.
            input_df[f'{col}_year'] = input_df[col].dt.year
            input_df[f'{col}_month'] = input_df[col].dt.month
            input_df[f'{col}_day'] = input_df[col].dt.day
            input_df[f'{col}_hour'] = input_df[col].dt.hour
            # Drop the original datetime column if not needed
            input_df.drop(columns=[col], inplace=True)
        except Exception as e:
            print(f"Error processing datetime column {col}: {e}")

    return input_df

def create_output_csv(input_csv, best_match_file, best_match_columns):
    input_df = pd.read_csv(input_csv)
    output_df = input_df[best_match_columns].copy()

    # Clean the data
    output_df = clean_data(output_df)

    # Determine the subdirectory based on keywords in the filename
    subdirectory = 'Others'  # Default subdirectory
    if 'sales' in input_csv.lower():
        subdirectory = 'Sales'
    elif 'department' in input_csv.lower():
        subdirectory = 'Department'
    elif 'aggregators' in input_csv.lower():
        subdirectory = 'Aggregators'
    elif 'inventory' in input_csv.lower():
        subdirectory = 'Inventory'

    # Define the base output directory
    base_output_dir = r'E:\Pranav\Hackathons\MlOps Datahack\OutputNew'

    # Evaluate the severity of the data
    severity = evaluate_severity(input_df)

    # Create a new directory for output files based on severity
    output_dir = os.path.join(base_output_dir, subdirectory, severity)
    os.makedirs(output_dir, exist_ok=True)

    # Save the output CSV in the new directory with the original filename
    output_csv = os.path.join(output_dir, os.path.basename(input_csv))
    output_df.to_csv(output_csv, index=False)
    print(f"Output saved to {output_csv}")

def fetch_csv_from_api(api_url, save_path):
    response = requests.get(api_url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"CSV downloaded and saved to {save_path}")
    else:
        print(f"Failed to download CSV. Status code: {response.status_code}")

def process_single_file(input_csv):
    # Print the input CSV path for debugging
    print(f"Input CSV path: {input_csv}")

    # Ensure the directory is correctly identified
    directory = os.path.dirname(input_csv)
    print(f"Extracted directory: {directory}")  # Debugging line

    if not directory:
        print("Directory path is empty. Please check the input_csv path.")
        return

    # Ensure the directory exists
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist. Creating it.")
        os.makedirs(directory)

    # List all CSV files in the directory of the input file
    csv_files = [os.path.join(directory, file) for file in os.listdir(directory) if file.endswith('.csv')]

    # Process the input CSV file
    best_match_file, best_match_columns = find_best_match(input_csv, csv_files)
    if best_match_file:
        print(f"Best match for {input_csv}: {best_match_file} with {len(best_match_columns)} matching columns")
        create_output_csv(input_csv, best_match_file, best_match_columns)
    else:
        print(f"No matching columns found for {input_csv}.")

# Update the input CSV file path using a relative path
input_csv = os.path.join('..', 'MlOps Datahack', 'Sales_Performance_Metrics.csv')

# Process the user-provided CSV file
process_single_file(input_csv)

# # Example usage
# api_url = 'https://example.com/data.csv'  # Replace with your API URL
# save_path = os.path.join('path', 'to', 'save', 'directory', 'data.csv')  # Update with your desired path
# fetch_csv_from_api(api_url, save_path)
# process_single_file(save_path)
