from configs import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Topic
from models import Post
from models import Comment
Topic = Topic.Topic
Post = Post.Post
Comment = Comment.Comment

conn_str = 'mysql://'+config.db["user"]+':'+config.db["pw"]+'@'+config.db["host"]+':'+config.db["port"]+'/'+config.db["name"]
engine = create_engine(conn_str, echo=False)
Session = sessionmaker(bind=engine)
session = Session()

def upsertTopic(name, post_count):
	topic = Topic(name, post_count)
	session.add(topic)
	session.commit()

def upsertPost(topic_id, name, slug, email, relative_url, score):
	post = Post(topic_id, name, slug, email, relative_url, score)
	session.add(post)
	session.commit()

def upsertComment(name, text, post_id, replied_id, relative_url, score):
	comment = Comment(name, text, post_id, replied_id, relative_url, score)
	session.add(comment)
	session.commit()

def selectTopics():
	records = session.query(Topic).all()
	return records

def selectTopicByName(name):
	record = session.query(Topic).filter(Topic.name == name).one()
	return record

def selectPostsByTopic(topic_id):
	records = session.query(Post).filter(Post.topic_id == topic_id)
	return records

def selectCommentsByPost(post_id):
	records = session.query(Comment).filter(Comment.post_id == post_id)
	return records

def selectPostBySlug(post_slug):
	record = session.query(Post).filter(Post.slug == post_slug).one()
	return record

def getPostCount(topic_id):
	count = session.query(Post).filter(Post.topic_id == topic_id).count()
	return count

def getCommentCount(post_id):
	count = session.query(Comment).filter(Comment.post_id == post_id).count()
	return count
