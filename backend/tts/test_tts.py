# test_tts.py

from TTS.api import TTS

def main():
    # Initialize TTS with a pre-trained model
    print("Loading TTS model...")
    tts = TTS(model_name="tts_models/en/ljspeech/glow-tts", progress_bar=True, gpu=False)


    # Define your test text
    text = "Hello Krish! This is a test of the Echoes voice chatbot using Coqui TTS."

    # Output path for the synthesized speech
    output_path = "output.wav"

    # Synthesize the speech and save to file
    print("Synthesizing speech...")
    tts.tts_to_file(text=text, file_path=output_path)

    print(f"✅ Done! Synthesized audio saved as: {output_path}")

if __name__ == "__main__":
    main()
