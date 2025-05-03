from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

# Example function to get server status from Exaroton API
def get_server_status():
    # Make an API call to Exaroton to get the server status
    response = requests.get("https://api.exaroton.com/v1/servers/YOUR_SERVER_ID/status")
    return response.json()

# Route to handle server status
@app.route("/server-status")
def server_status():
    status = get_server_status()
    return jsonify(status=status['status'])

# Route to load the BlueMap display (could be a map image or dynamic content)
@app.route("/bluemap")
def bluemap():
    # Example: You can generate an image URL or embed a live map here
    return render_template("bluemap.html")

# Route for the economy shop
@app.route("/shop")
def shop():
    # Example: Fetch the items from the economy shop and display them
    items = [
        {"name": "Diamond", "price": 100},
        {"name": "Iron Sword", "price": 50},
        {"name": "Health Potion", "price": 25},
    ]
    return render_template("shop.html", items=items)

# Route for checking friends' online status using PooperMC
@app.route("/friends-online")
def friends_online():
    # Fetch friends' online status
    friends_status = {
        "Friend1": "Online",
        "Friend2": "Offline",
        "Friend3": "Online"
    }
    return jsonify(friends=friends_status)

if __name__ == "__main__":
    app.run(debug=True)
