# Node-Red startup

mkdir -p /tmp/logs
exec /mon/start "node $NODE_OPTIONS node_modules/node-red/red.js -v $FLOWS --userDir /data" >> /tmp/logs/stdout.log 2>>/tmp/logs/stderr.log