sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  < /etc/nginx/iot-edge.conf.template \
  > /etc/nginx/iot-edge.conf

mkdir -p /tmp/logs
exec nginx -g 'daemon off;' >> /tmp/logs/stdout.log 2>>/tmp/logs/stderr.log