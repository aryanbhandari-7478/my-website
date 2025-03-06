from flask import Flask, render_template, request, jsonify
import cohere

app = Flask(__name__)

# Cohere API Key
API_KEY = "DLE7zmQtd8wY9WpB7UE3CJ5ObYzVyBeEO66JEIOC"  # Replace with your actual key
co = cohere.Client(API_KEY)

def query_cohere(prompt):
    """Generate AI response using Cohere."""
    try:
        response = co.generate(
            model='command',
            prompt=prompt,
            max_tokens=1000
        )
        return response.generations[0].text.strip()
    except Exception as e:
        return f"⚠ Error: {str(e)}"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]
    bot_response = query_cohere(user_message)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
