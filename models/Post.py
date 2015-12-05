from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from configs import config
Base = declarative_base()
class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True)
    topic_id = Column(Integer)
    name = Column(String(255))
    slug = Column(String(255))
    email = Column(String(255))
    relative_url = Column(String(255))
    score = Column(Integer)
    created_timestamp = Column(Integer)
    

    def __init__(self, topic_id, name, slug, email, relative_url, score, created_timestamp):
	    self.topic_id = topic_id
	    self.name = name
	    self.slug = slug
	    self.email = email
	    self.relative_url = relative_url
	    self.score = score
	    self.created_timestamp = created_timestamp

    def __repr__(self):
        return "(Post [%s])" % (self.name)