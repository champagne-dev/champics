import sys
# Override default config if config_local exists (if we are local).

if 'DATABASE_URL' in os.environ:
    url  = urlparse.urlparse(os.environ['DATABASE_URL'])
    host = url.hostname
    user = url.username
    name = url.path[1:]
    pw   = url.password
    port = url.port
else:
	host = "localhost"
	user = "root"
	name = "champics"
	pw   = "champagnePapi0"
	port = "3306"

db = dict(
    host         = host
,   user         = url.username
,   name         = url.path[1:]
,   pw           = url.password
,	port 		 = url.port  # Has to be a string
)


redis = dict(
    host    = 'DEFAULT_REDIS_HOSTNAME'
,   port    = "DEFAULT_REDIS_PORT"
,   db      = "DEFAULT_REDIS_DB"         
)

dirs = dict(
	pic_dir				= "pics/"
,	logs				= "docs/logs"
)

server = dict(
	debug				= False
,	host 				= "0.0.0.0"
,	port 				= 80
)

try:
	from config_local import *
except ImportError as e:
	pass
	
	