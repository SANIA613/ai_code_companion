from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai  # Make sure google-genai is installed

app = Flask(__name__)
CORS(app)

# Initialize Gemini client
client = genai.Client(api_key="Add your api key ")  # <-- Replace with your key

@app.route("/generate", methods=["POST"])
def generate_code():
    data = request.json
    prompt = data.get("prompt", "")

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return jsonify({"output": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
