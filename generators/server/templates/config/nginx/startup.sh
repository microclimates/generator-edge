sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  -e "s/replace_with_site_id/SITE_ID/g" \
  < /etc/nginx/iot-edge.conf.template \
  > /etc/nginx/iot-edge.conf

exec nginx -g 'daemon off;' >> /tmp/logs/stdout.log 2>>/tmp/logs/stderr.log