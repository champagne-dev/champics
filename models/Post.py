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
    score = Column(Integer)
    created_timestamp = Column(Integer)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "(Post [%s])" % (self.name)