sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  < /etc/nginx/iot-edge.conf.template \
  > /etc/nginx/iot-edge.conf

exec nginx -g 'daemon off;'
