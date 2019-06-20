# Graphite startup
sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  < /opt/graphite/conf/carbon.conf.template \
  > /opt/graphite/conf/carbon.conf

# Graphite API requires a reboot after first time initialization
if test ! -f /tmp/logs/.initialized
then
  /sbin/my_init >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log &
  sleep 30
  killall /usr/bin/python3
  > /tmp/logs/.initialized
  exit
fi

exec /sbin/my_init >> /tmp/logs/stdout.log 2>> /tmp/logs/stderr.log
