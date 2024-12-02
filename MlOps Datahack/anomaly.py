import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib
matplotlib.use('Agg')
def load_data(file_path):
    """Load the cleaned data from a CSV file."""
    return pd.read_csv(file_path)

def prepare_features_and_target(df):
    """Prepare features and target for training."""
    features = df[['Order_Total', 'Settled_Total']]
    target = df['Order_Total'] - df['Settled_Total']
    return features, target

def train_model(features, target):
    """Train a linear regression model."""
    model = LinearRegression()
    model.fit(features, target)
    return model

def predict_discrepancies(model, features):
    """Predict discrepancies using the trained model."""
    return model.predict(features)

def identify_significant_discrepancies(predictions, threshold=150):
    """Identify significant discrepancies based on a threshold."""
    return predictions.apply(lambda x: x > threshold or x < -threshold)

def anomaly_detection():
    file_path = 'cleaned_Bill_Settlement_Report.csv'
    df = load_data(file_path)
    features, target = prepare_features_and_target(df)
    model = train_model(features, target)
    df['Predicted_Discrepancy'] = predict_discrepancies(model, features)
    df['Is_Discrepancy'] = identify_significant_discrepancies(df['Predicted_Discrepancy'])
    
    # Return only the invoices with discrepancies
    discrepancies = df[df['Is_Discrepancy']]
    return [f"Discrepancy or suspicious activity found in Invoice Number: {invoice_no}" for invoice_no in discrepancies['Invoice_No_']]
