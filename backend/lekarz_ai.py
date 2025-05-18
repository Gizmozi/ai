from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route("/api/gpt", methods=["POST"])
def gpt():
    data = request.get_json()
    prompt = data.get("prompt")

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Jesteś pomocnikiem lekarza. Odpowiadaj konkretnie i profesjonalnie."},
            {"role": "user", "content": prompt}
        ]
    )

    return jsonify({"reply": response.choices[0].message["content"]})

if __name__ == "__main__":
    app.run(port=5000, debug=True)