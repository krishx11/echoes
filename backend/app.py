from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from chatbot.chatbot import generate_response
from tts.tts import speak_text
import os

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# Alternatively, specify only your frontend URL
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Define paths for uploading and saving files
UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__))
VOICE_PATH = os.path.join(UPLOAD_FOLDER, "voice_sample.wav")
AUDIO_OUTPUT_PATH = os.path.join(UPLOAD_FOLDER, "static/audio/response.wav")

# Ensure the audio output directory exists
os.makedirs(os.path.dirname(AUDIO_OUTPUT_PATH), exist_ok=True)

# Route for uploading voice sample
@app.route("/upload_voice", methods=["POST"])
def upload_voice():
    voice_file = request.files.get("voice")
    if not voice_file:
        return jsonify({"error": "No voice file uploaded"}), 400

    # Use with statement to safely handle file saving
    try:
        voice_file.save(VOICE_PATH)
        return jsonify({"message": "Voice uploaded successfully."}), 200
    except Exception as e:
        return jsonify({"error": f"Error saving voice file: {str(e)}"}), 500

# Route for handling chat and generating voice responses
@app.route("/chat", methods=["POST"])
def chat():
    if not os.path.exists(VOICE_PATH):
        return jsonify({"error": "No voice sample uploaded yet."}), 400

    data = request.get_json()
    user_text = data.get("text", "").strip()

    if not user_text:
        return jsonify({"error": "Text is empty."}), 400

    try:
        # Generate chatbot response
        reply = generate_response(user_text)
        
        # Generate the audio for the response
        speak_text(reply, speaker_path=VOICE_PATH, output_path=AUDIO_OUTPUT_PATH)

        return jsonify({
            "response": reply,
            "audio_url": "/static/audio/response.wav"
        })
    except Exception as e:
        return jsonify({"error": f"Error during chat processing: {str(e)}"}), 500

# Route to serve audio file
@app.route("/static/audio/<filename>")
def serve_audio(filename):
    try:
        return send_from_directory(os.path.join(UPLOAD_FOLDER, "static/audio"), filename)
    except FileNotFoundError:
        return jsonify({"error": "Audio file not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
