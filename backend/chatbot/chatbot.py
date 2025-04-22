import os
import requests
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

def generate_response(user_input):
    if not GOOGLE_API_KEY:
        raise ValueError("Google API key not set!")

    headers = {
        "Content-Type": "application/json"
    }

    params = {
        "key": GOOGLE_API_KEY
    }

    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": user_input
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, params=params, json=data)
        response.raise_for_status()
        result = response.json()
        return result['candidates'][0]['content']['parts'][0]['text']
    except requests.exceptions.HTTPError as http_err:
        return f"HTTP error occurred: {http_err}"
    except Exception as e:
        return f"⚠️ Chatbot error: {str(e)}"
