import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/create-journal", methods=["POST"])
def create_journal():
    data = request.get_json()
    name = data.get("name")

    if os.path.exists("journals.json"):
        with open("journals.json", "r") as file:
            json_data = json.load(file)
    else:
        json_data = {"journals": {}}

    # journals = json_data["journals"]
    # journals[name] = ""
    json_data["journals"][name] = ""

    with open("journals.json", "w") as file:
        json.dump(json_data, file, indent=4)

    return jsonify({"message": "Data saved!"})


@app.route("/api/get-journals")
def get_journals():
    try:
        with open("journals.json") as file:
            json_data = json.load(file)
            return jsonify({"message": "Request successful", "data": json_data})
    except FileNotFoundError:
        return jsonify({"message": "Please create a journal!"})


@app.route("/api/modify-journal", methods=["POST"])
def modify_journal():
    data = request.get_json()
    text = data.get("text")
    journal_name = data.get("name")

    with open("journals.json", "r") as file:
        json_data = json.load(file)

    json_data["journals"][journal_name] = text

    with open("journals.json", "w") as file:
        json.dump(json_data, file, indent=4)
        return jsonify({"message": "Data saved!"})


if __name__ == "__main__":
    app.run(debug=True)
