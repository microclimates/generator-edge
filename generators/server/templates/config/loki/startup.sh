# Loki startup

mkdir -p /tmp/logs
exec /bin/loki -config.file=/etc/loki/local-config.yaml >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log