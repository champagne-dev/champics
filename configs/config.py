db = dict(
    host         = 'MYSQL_HOSTNAME_GOES_HERE'
,   user         = 'MYSQL_USERNAME_GOES_HERE'
,   name         = 'MYSQL_DBNAME_GOES_HERE'
,   pw           = 'MYSQL_PASSWORD_GOES_HERE'
)

redis = dict(
    host    = 'DEFAULT_REDIS_HOSTNAME'
,   port    = "DEFAULT_REDIS_PORT"
,   db      = "DEFAULT_REDIS_DB"         
)

# Override default config.
try:
    from config_local import *
except ImportError as e:
    pass