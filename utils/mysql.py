from configs import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Topic
from models import Post
from models import Comment
conn_str = 'mysql://'+config.db["user"]+':'+config.db["pw"]+'@'+config.db["host"]+':'+config.db["port"]+'/'+config.db["name"]
engine = create_engine(conn_str, echo=False)
Session = sessionmaker(bind=engine)
session = Session()

def upsertTopic(name, created_timestamp):
	topic = Topic(name, created_timestamp)
	session.add(topic)

def upsertPost(topic_id, name, slug, email, relative_url, score, created_timestamp):
	topic = Post(topic_id, name, slug, email, relative_url, score, created_timestamp)
	session.add(topic)

def upsertComment(name, text, post_id, replied_id, relative_url, score, created_timestamp):
	comment = Comment(name, text, post_id, replied_id, relative_url, score, created_timestamp)
	session.add(comment)

def selectTopics():
	records = session.query(Topic.Topic).all()
	return records

def selectTopicByName(name):
	record = session.query(Topic).filter(Topic.name == name).one()
	return record

def selectPostsByTopic(topic_id):
	records = session.query(Post).filter(Post.topic_id == topic_id)
	return records

def selectPostBySlug(post_slug):
	record = session.query(Post).filter(Post.slug == post_slug).one()
	return record

def selectCommentsByPost(post_id):
	records = session.query(Comment).filter(Comment.post_id == post_id)
	return records

def getPostCount(topic_id):
	count = session.query(Post).filter(Post.topic_id == topic_id).count()
	return count