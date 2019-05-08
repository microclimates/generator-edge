# Node-Red startup

mkdir -p /tmp/logs
exec npm start -- --userDir /data >> /tmp/logs/stdout.log 2>>/tmp/logs/stderr.log