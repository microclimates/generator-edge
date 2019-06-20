sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  < /etc/nginx/iot-edge.conf.template \
  > /etc/nginx/iot-edge.conf

sed \
  -e "s/SITE_NAME/${SITE_NAME}/g" \
  < /mnt/docs/_index.html \
  > /mnt/docs/index.html

exec nginx -g 'daemon off;' >> /tmp/logs/stdout.log 2>>/tmp/logs/stderr.log