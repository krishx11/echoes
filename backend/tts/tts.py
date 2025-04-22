from TTS.api import TTS
import os
import soundfile as sf
import sounddevice as sd

# Load Coqui voice cloning model (multilingual)
tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=False, gpu=False)

# Speak function — takes text & speaker voice path, saves audio to file
def speak_text(text: str, speaker_path: str = "voice_sample.wav", output_path: str = "static/audio/response.wav", language: str = "en") -> str:
    wav = tts.tts(text=text, speaker_wav=speaker_path, language=language)
    #for testing ausio playback
    #sd.play(wav, samplerate=tts.synthesizer.output_sample_rate)
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Save WAV file
    sf.write(output_path, wav, tts.synthesizer.output_sample_rate)
    
    return output_path  # path for Flask to return
