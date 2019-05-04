sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  -e "s/SITE_FQDN/${SITE_FQDN}/g" \
  -e "s/HTTP_PORT/${HTTP_PORT}/g" \
  < /etc/grafana/grafana.ini.template \
  > /etc/grafana/grafana.ini

sed \
  -e "s/SITE_ID/${SITE_ID}/g" \
  < /etc/grafana/provisioning/datasources/graphite.yaml.template \
  > /etc/grafana/provisioning/datasources/graphite.yaml

exec /run.sh