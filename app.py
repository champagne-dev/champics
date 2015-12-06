import time, base64, os, urllib, imghdr, random
import StringIO
from flask import Flask, render_template, jsonify, g, request, send_from_directory
from utils import mysql
from utils import ranking
from slugify import slugify
from configs import config
from PIL import Image
import json
app = Flask(__name__, static_url_path='')

success = [
    {
        "error": False,
        "data": "request completed"
    }
]
def defaultDatetimeJSONDump(obj):
    import calendar, datetime

    if isinstance(obj, datetime.datetime):
        if obj.utcoffset() is not None:
            obj = obj - obj.utcoffset()
    millis = int(
        calendar.timegm(obj.timetuple()) * 1000 +
        obj.microsecond / 1000
    )
    return millis

@app.before_request
def before_request():
    if request.method == "GET":
        topics = mysql.selectTopics()
        mapped_topics = list(map(lambda x: {"name": x.name, "id": str(x.id)}, topics))
        g.topics = mapped_topics
    
@app.route("/", methods=["GET"])
def frontpageView():
    return render_template("frontpage.html", topics=g.topics)

@app.route("/c/<topic_name>", methods=["GET"])
def topicView(topic_name):
    p = request.args.get('p')
    topic = mysql.selectTopicByName(topic_name)
    posts = mysql.selectPostsByTopic(topic.id)

    try:
        mapped_posts = list(map(lambda x: {
            "name": x.name, 
            "slug": x.slug, 
            "relative_url": x.relative_url, 
            "score": str(int(x.score)),
            "id": str(x.id),
            "created_timestamp": str(x.created_timestamp)
        }, posts))
        try:
            if p == "new":
                mapped_posts = ranking.orderNewPosts(mapped_posts)
            else:
                mapped_posts = ranking.orderTopPosts(mapped_posts)
                
        except Exception as e:
            print e

    except Exception as e:
        mapped_posts = list()

    return render_template("topic.html", topics=g.topics, current_topic={"name": topic.name, "id": str(topic.id)}, posts=mapped_posts)

@app.route("/c/<topic_name>/<post_slug>", methods=["GET"])
def postView(topic_name, post_slug):
    topic = mysql.selectTopicByName(topic_name)
    post = mysql.selectPostBySlug(post_slug)
    comments = mysql.selectCommentsByPost(post.id)

    try:
        mapped_comments = list(map(lambda x: {
            "text": x.text, 
            "author": x.author, 
            "replied_id": str(x.replied_id), 
            "score": str(int(x.score)), 
            "relative_url": x.relative_url,
            "id": str(x.id),
            "created_timestamp": str(x.created_timestamp)
        }, comments))

    except:
        mapped_comments = list()

    return render_template("post.html", topics=g.topics, current_topic={"name": topic.name, "id": str(topic.id)}, current_post=json.dumps({"id": post.id, "name": post.name, "slug": post.slug, "relative_url": post.relative_url, "score": post.score, "created_timestamp": post.created_timestamp, "comments":mapped_comments}, default=defaultDatetimeJSONDump))

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

    mysql.upsertTopic(name, 0)

    return jsonify(results=success)

@app.route("/<topic_name>/createPost", methods=["POST"])
def createPost(topic_name):
    url = request.form['url']
    name = request.form['name']
    email = request.form['email']
    topic_id = request.form['topic_id']
    post_file_name = "post.png"

    count = mysql.getPostCount(topic_id)
    filename = config.dirs["pic_dir"]+topic_name+"/"+str(count)+"/"+post_file_name
    try:
        if not os.path.exists(os.path.dirname(filename)):
            os.makedirs(os.path.dirname(filename))
        with open(filename, "w") as text_file:
            try:
                url_contents = urllib.urlopen(url).read()
            except Exception as e:
                error = [
                    {
                        "error": True,
                        "data": "URL could not be read"
                    }
                ]
                return jsonify(results=error)

            text_file.write(url_contents)
            os.chmod(filename, 0o774)

            try: 
                im = Image.open(StringIO.StringIO(url_contents))
            except Exception as e:
                error = [
                    {
                        "error": True,
                        "data": "You have to post an image url"
                    }
                ]
                return jsonify(results=error)
    except Exception as e:
        print e
        error = [
            {
                "error": True,
                "data": "File could not be saved"
            }
        ]

        return jsonify(results=error)
    
    if not name or not email:
        error = [
            {
                "error": True,
                "data": "Not all data sent"
            }
        ]
        return jsonify(results=error)

    slug = slugify(name)

    if mysql.checkPostSlug(slug):
        slug = slug+str(count)

    mysql.upsertPost(topic_id, name, slug, email, filename, 0)
    return jsonify(results=success)

@app.route("/<topic_name>/<post_slug>/createComment", methods=["POST"])
def createComment(topic_name, post_slug):
    try:
        text = request.form['text']
        author = request.form['author']
        replied_id = request.form['replied_id']
        post_id = request.form['post_id']
        edit_data = request.form['edit_data']
    except KeyError as e:
        error = [
            {
                "error": True,
                "data": "Not all data sent, key error"
            }
        ]
        return jsonify(results=error) 
    

    if not text or not post_id or not replied_id:
        error = [
            {
                "error": True,
                "data": "Not all data sent is defined"
            }
        ]
        return jsonify(results=error)

    edit_data = edit_data.replace("data:image/png;base64,", "")
    edit_data = edit_data.replace(" ", "+")
    base64_edit_data = base64.b64decode(edit_data)
    count = mysql.getCommentCount(post_id)
    file_name = str(count)+".png"
    print file_name

    try:
        filename = config.dirs["pic_dir"]+topic_name+"/"+post_id+"/"+file_name
        if not os.path.exists(os.path.dirname(filename)):
            os.makedirs(os.path.dirname(filename))
        with open(filename, "w") as text_file:
            text_file.write(base64_edit_data)
            os.chmod(filename, 0o774)
    except Exception as e:
        print e
        error = [
            {
                "error": True,
                "data": "Could not create image file, sorry"
            }
        ]
        return jsonify(results=error)

    mysql.upsertComment(text, author, post_id, replied_id, filename, 0)
    success[0]["relative_url"] = filename
    return jsonify(results=success)

@app.route("/<topic_name>/<post_slug>/createUpvote", methods=["PUT"])
def createPostUpvote(topic_name, post_slug):
    post = mysql.selectPostBySlug(post_slug)
    mysql.incrementPostScore(post.id)
    return jsonify(results=success)

@app.route("/<topic_name>/<post_slug>/createDownvote", methods=["PUT"])
def createPostDownvote(topic_name, post_slug):
    post = mysql.selectPostBySlug(post_slug)
    mysql.decrementPostScore(post.id)
    return jsonify(results=success)

@app.route("/<topic_name>/<post_slug>/<comment_id>/createUpvote", methods=["PUT"])
def createCommentUpvote(topic_name, post_slug, comment_id):
    mysql.incrementCommentScore(comment_id)
    return jsonify(results=success)

@app.route("/<topic_name>/<post_slug>/<comment_id>/createDownvote", methods=["PUT"])
def createCommentDownvote(topic_name, post_slug, comment_id):
    mysql.incrementCommentScore(comment_id)
    return jsonify(results=success)

@app.route('/pics/<path:path>')
def send_pics(path):
    return send_from_directory('pics', path)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.errorhandler(Exception)
def all_exception_handler(error):
    print error
    if request.method == "GET":
        topic = random.choice(g.topics)
        return render_template("error.html", error_message="We messed up :(, here's a random page <a href=\"/c/"+topic["name"]+"\">"+topic["name"]+"</a>")
    else:
        return error

if __name__ == "__main__":
    app.run(debug=True)