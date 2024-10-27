

# 🍽️ Paleto's Restaurant Network MLOps Pipeline

<img src="https://i.ibb.co/8c906TZ/banner-image.png" alt="Project Banner" width="300"  />

## 📌 Overview
Paleto's Restaurant MLOps Pipeline is designed to streamline data processing, analysis, and prediction for a network of independently operated restaurants. This pipeline automates data cleaning, integrates data from various sources, and provides restaurant owners with valuable sales insights, predictions, and anomaly detection.

## ✨ Features
- 🚀 **Automated Data Cleaning**: Supports ingestion of large, unstructured datasets (30+ CSV files with over 2 million rows each).
- 📊 **Sales Forecasting**: Predicts total sales, item-specific sales trends, and festival-based demand fluctuations using an ARIMA model.
- 🛠️ **Anomaly Detection**: Flags unusual activities such as potential theft or unsettled payments.
- 💻 **Web Interface**: User-friendly interface where owners can upload raw CSV files and instantly receive insights, visualizations, and predictions.

## 🛠️ Tech Stack
- **Backend**: Python, Flask, Django (API handling)
- **Frontend**: HTML, CSS, JavaScript
- **Machine Learning**: ARIMA for forecasting
- **Deployment**: Ngrok for backend services, Netlify for the frontend

## 🎥 Demo
- [📹 Watch Demo Video](https://www.youtube.com/watch?v=MZezj2Pkgl4)
- [🌐 Live Frontend](https://paletos-bay.netlify.app) *(Note: Backend currently unavailable)*

## 🚀 Installation
To set up the project locally, follow these steps:

### Prerequisites
- Python 3.8 or above
- Django, Flask, Pandas, NumPy, Scikit-Learn

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YourUsername/paletos-restaurant-mlops.git
   cd paletos-restaurant-mlops
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Adjust Dataset Path**:
   - Update the dataset paths in the configuration files as required.

5. **Run the Backend**:
   ```bash
   python server.py
   ```

6. **Access the Web Interface**:
   - Navigate to `http://localhost:8000` to use the application.

## 📖 Usage
1. **Data Upload**: Owners can upload raw CSV data through the web interface.
2. **Data Analysis and Visualization**: Instantly get data analysis, visualizations, and sales predictions.
3. **Anomaly Detection**: Detects irregular transactions or suspicious activities automatically.

## 🤝 Contributing
Feel free to open issues or submit pull requests to help improve this project. Please follow the contribution guidelines.

## 📜 License
This project is licensed under the MIT License.

