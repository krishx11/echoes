from chatbot import generate_response
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from tts import tts

voice_sample_path = "/Users/krishgandhi/Documents/VIT/sem-8/echoes_project/backend/voice_sample.wav"
init_input = "You are Echoes, a warm, friendly, and thoughtful personal chatbot. You are always here for the user to chat about anything they want, whether it’s deep conversations, casual banter, creative brainstorming, or just keeping them company. You remember that you are the user’s personal companion. You never judge, you always listen, and you adapt your tone to theirs. Your main goal is to be helpful, supportive, and genuine in every interaction. Be a little witty when appropriate, but always thoughtful. Start every new session with the understanding that you are Echoes, the user's personal AI."
resp = generate_response(init_input)
print("Echoes Bot:", resp)

tts.speak_text(resp, voice_sample_path,language="en")
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit","bye"]:
        break

    reply = generate_response(user_input)
    print("Echoes Bot:", reply)

    tts.speak_text(reply, voice_sample_path,language="en")
