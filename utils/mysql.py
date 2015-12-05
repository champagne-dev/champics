from configs import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
engine = create_engine('mysql://'+config.db["username"]+':'+config.db["name"]+'_'+config.db["password"]+'@'+config.db["host"]+':'+config.db["port"]+'/'+config.db["name"], echo=False)
Session = sessionmaker(bind=engine)
session = Session()

def do():
	print config.db["host"]