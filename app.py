from flask import Flask, render_template, jsonify
from utils import mysql
app = Flask(__name__)

success = [
	{
		"error": False,
		"data": "request completed"
	}
]

@app.route("/", methods=["GET"])
def frontpageView():
    return render_template("frontpage.html")

@app.route("/c/<topic_name>", methods=["GET"])
def topicView():
    return render_template("topic.html")

@app.route("/c/<topic_name>/<post_slug>", methods=["GET"])
def postView():
    return render_template("post.html")

@app.route("/createTopic", methods=["POST"])
def createTopic():
	name = request.form['name']

	if not name:
		error = [
			{
				"error": True,
				"data": "No \"name\" sent"
			}
		]
		return jsonify(results=error)

	mysql.upsertTopic(name, "", "")

	return jsonify(results=success)

@app.route("/<topic_name>/createPost", methods=["POST"])
def createPost():
    return "ok"

@app.route("/<topic_name>/<post_slug>/createComment", methods=["POST"])
def createComment():
    return "ok"

if __name__ == "__main__":
    app.run()