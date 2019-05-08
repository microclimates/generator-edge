# Promtail startup

mkdir -p /tmp/logs
exec /usr/bin/promtail -config.file=/etc/promtail/edge-config.yaml >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log