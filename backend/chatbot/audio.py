from chatbot import generate_response
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from tts import tts

voice_sample_path = "/Users/krishgandhi/Documents/VIT/sem-8/echoes_project/backend/voice_sample.wav"

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit","bye"]:
        break

    reply = generate_response(user_input)
    print("Echoes Bot:", reply)

    tts.speak_text(reply, voice_sample_path,language="en")
