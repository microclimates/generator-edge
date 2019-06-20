# Auth server startup
/mon/mon -p /data/auth.pid "exec node auth.js" >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log &

# Edge server startup
exec /mon/start "node app.js" >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log