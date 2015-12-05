import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
from configs import config
Base = declarative_base()
class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer, primary_key=True)
    text = Column(String(255))
    author = Column(String(255))
    post_id = Column(Integer)
    replied_id = Column(Integer)
    relative_url = Column(String(255))
    score = Column(Integer)
    created_timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, text, author, post_id, replied_id, relative_url, score):
        self.text = text
        self.author = author
        self.post_id = post_id
        self.replied_id = replied_id
        self.relative_url = relative_url
        self.score = score

    def __repr__(self):
        return "(Comment [%s])" % (self.name)