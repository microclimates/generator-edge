# mqtt startup

mkdir -p /tmp/logs
exec /usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log