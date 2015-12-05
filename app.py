import time
from flask import Flask, render_template, jsonify, g, request
from utils import mysql
from slugify import slugify

app = Flask(__name__)

success = [
    {
        "error": False,
        "data": "request completed"
    }
]

@app.before_request
def before_request():
    if request.method == "GET":
        topics = mysql.selectTopics()
        mapped_topics = list(map(lambda x: {"name": x.name}, topics))
        g.topics = mapped_topics

@app.route("/", methods=["GET"])
def frontpageView():
    return render_template("frontpage.html", topics=g.topics)

@app.route("/c/<topic_name>", methods=["GET"])
def topicView(topic_name):
    topic = mysql.selectTopicByName(topic_name)
    posts = selectPostsByTopic(topic.id)

    mapped_posts = list(map(lambda x: {
        "name": x.name, 
        "slug": x.slug, 
        "relative_url": x.relative_url, 
        "score": x.score, 
        "created_timestamp": x.created_timestamp
    }, topics))

    return render_template("topic.html", topics=g.topics, current_topic={"name": topic.name, "topic": topic.id}, posts=mapped_posts)

@app.route("/c/<topic_name>/<post_slug>", methods=["GET"])
def postView(topic_name, post_slug):
    topic = mysql.selectTopicByName(topic_name)
    post = mysql.selectTopicBySlug(post_slug)
    
    return render_template("post.html", topics=g.topics, current_topic={"name": topic.name, "topic": topic.id}, current_post=)

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

    mysql.upsertTopic(name, 0, time.time())

    return jsonify(results=success)

@app.route("/<topic_name>/createPost", methods=["POST"])
def createPost(topic_name):
    name = request.form['name']
    email = request.form['email']
    topic_id = request.form['topic_id']

    if not name or not email:
        error = [
            {
                "error": True,
                "data": "Not all data sent"
            }
        ]
        return jsonify(results=error)

    slug = slugify(name)
    mysql.upsertPost(topic_id, name, slug, email, 0, time.time())

    return jsonify(results=success)

@app.route("/<topic_name>/<post_slug>/createComment", methods=["POST"])
def createComment(topic_name, post_slug):
    text = request.form['text']
    author = request.form['author']
    replied_id = request.form['replied_id']
    post_id = request.form['post_id']

    if not text or not post_id or not replied_id:
        error = [
            {
                "error": True,
                "data": "Not all data sent"
            }
        ]
        return jsonify(results=error)

    mysql.upsertComment(text, author, post_id, replied_id, 0, time.time())
    return jsonify(results=success)

@app.errorhandler(Exception)
def all_exception_handler(error):
    print error
    return 'Error', 500

if __name__ == "__main__":
    app.run(debug=True)