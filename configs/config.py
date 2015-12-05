import sys
# Override default config if config_local exists (if we are local).
try:
	from config_local import *
except ImportError as e:
	pass
	
	db = dict(
	    host         = 'MYSQL_HOSTNAME_GOES_HERE'
	,   user         = 'MYSQL_USERNAME_GOES_HERE'
	,   name         = 'MYSQL_DBNAME_GOES_HERE'
	,   pw           = 'MYSQL_PASSWORD_GOES_HERE'
	,	port 		 = 'MYSQL_PORT_GOES_HERE'  # Has to be a string
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

