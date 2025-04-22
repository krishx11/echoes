from F5_TTS import TTS
import sounddevice as sd
import numpy as np

# Initialize F5 TTS for voice cloning
tts = TTS(model_name="f5_tts_model")  # Use the appropriate F5 model

# Load the custom voice sample to generate a speaker embedding
def get_speaker_embedding(voice_path="voice_sample.wav"):
    # Assuming F5 TTS provides an embedding function similar to Resemblyzer
    # This is pseudo-code, adapt based on the actual F5 TTS API
    embedding = tts.get_speaker_embedding(voice_path)  # Generate speaker embedding from voice sample
    return embedding

# Convert text to speech with the custom voice using the speaker embedding
def speak_text(text, speaker_embedding):
    wav = tts.tts(text=text, speaker_embeddings=speaker_embedding)  # Generate speech using the custom voice
    # Play the generated audio
    sd.play(wav, samplerate=22050)
    sd.wait()

# Generate the speaker embedding once (you need a voice sample from the custom speaker)
embed = get_speaker_embedding("voice_sample.wav")  # Provide the path to the custom voice sample

# Main interaction loop
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break

    # Generate response from chatbot (use your chatbot response generator here)
    reply = "Hi there! How can I help you today?"  # Replace with actual response generation
    print("Echoes Bot:", reply)

    # Use F5 TTS to speak the response in the custom voice
    speak_text(reply, embed)
