import sys
# Override default config if config_local exists (if we are local).
db = dict(
    host         = 'localhost'
,   user         = 'root'
,   name         = 'champics'
,   pw           = 'champagnePapi0'
,	port 		 = '3306'  # Has to be a string
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


try:
	from config_local import *
except ImportError as e:
	pass
	
	