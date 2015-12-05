from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from configs import config
Base = declarative_base()
class Topic(Base):
    __tablename__ = "topic"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    post_count = Column(Integer)
    created_timestamp = Column(Integer)

    def __init__(self, name, post_count, created_timestamp):
        self.name = name
        self.post_count = post_count
        self.created_timestamp = created_timestamp
        
    def __repr__(self):
        return "(Topic [%s])" % (self.name)