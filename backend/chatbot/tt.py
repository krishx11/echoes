import requests

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

response = requests.get(API_URL)
print(response.status_code)  # Should print status code
print(response.text)  # Check response text
