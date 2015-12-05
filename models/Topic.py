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

    def __init__(self, name):
            self.name = name

    def __repr__(self):
            return "(Topic [%s])" % (self.name)