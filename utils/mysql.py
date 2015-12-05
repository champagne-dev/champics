from configs import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Topic
conn_str = 'mysql://'+config.db["user"]+':'+config.db["pw"]+'@'+config.db["host"]+':'+config.db["port"]+'/'+config.db["name"]
engine = create_engine(conn_str, echo=False)
Session = sessionmaker(bind=engine)
session = Session()
records = session.query(Topic.Topic).all()
print "Current Topics:"
for record in records:
	print record.name


def upsertTopic():
	return ""

def upsertPost():
	return ""

def upsertComment():
	return ""

def selectTopics():
	return ""

def selectPostsByTopic():
	return ""

def selectCommentsByPost():
	return ""