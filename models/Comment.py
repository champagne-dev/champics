from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from configs import config
Base = declarative_base()
class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer, primary_key=True)
    text = Column(String(255))
    post_id = Column(Integer)
    replied_id = Column(Integer)
    score = Column(Integer)
    created_timestamp = Column(Integer)

    def __init__(self, name, text, post_id, replied_id, score, created_timestamp):
        self.name = name
        self.text = text
        self.post_id = post_id
        self.replied_id = replied_id
        self.score = score
        self.created_timestamp = created_timestamp
        
    def __repr__(self):
        return "(Comment [%s])" % (self.name)