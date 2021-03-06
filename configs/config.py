import sys, os, urlparse
# Override default config if config_local exists (if we are local).

if 'DATABASE_URL' in os.environ:
    DURL = os.environ['DATABASE_URL']
    url  = urlparse.urlparse(DURL)
    print DURL
    sys.stdout.flush()
    host = url.hostname
    user = url.username
    name = url.path[1:]
    pw   = url.password
    port = url.port
else:
	DURL = ""
	host = "localhost"
	user = "root"
	name = "champics"
	pw   = "champagnePapi0"
	port = "3306"

db = dict(
    host         = host
,   user         = user
,   name         = name
,   pw           = pw
,	port 		 = port  # Has to be a string
,	url          = DURL
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
	
	