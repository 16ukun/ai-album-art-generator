from flask import Flask, request, jsonify
import analyzer  # your own audio processing module

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    try:
        result = analyzer.analyze(file)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# This part ensures Flask actually starts when run in Docker
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
