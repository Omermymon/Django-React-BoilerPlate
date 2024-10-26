import requests

url = "http://localhost:8000/api/invoices/"

try:
    response = requests.get(url)
    response.raise_for_status()  
    data = response.json()       
    print("Invoices:", data)
except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
