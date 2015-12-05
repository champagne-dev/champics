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

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "(Comment [%s])" % (self.name)