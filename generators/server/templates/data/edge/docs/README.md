<style type="text/css">
.example-block {
  background-color: #222;
  border-radius:5px;
  padding:20px;
  margin:40px 0 100px 20px !important;">
}
</style>
## Introduction

Welcome to the _${siteName}_ site - an
[edge server](https://en.wikipedia.org/wiki/Edge_computing "wikipedia.org")
<sup title="wikipedia.org"><i class="fas fa-external-link-alt fa-xs"></i></sup>
for integrating and automating your business processes with on-site IoT devices.

Based on the [Open IoT Edge](https://github.com/iot-edge)
<sup title="github.com"><i class="fas fa-external-link-alt fa-xs"></i></sup>
project, this site incorporates best of breed software into a full featured, easy to use edge server.

## Quick Tour

!> Login is required to enter the site.
The first user can login as *admin* with one-time password *admin*,
then navigate to <a target="_blank" href="/SITE_ID/admin/users">manage users</a> to add site users.
Ask your site administrator if you need a login.

### <i class="fa fa-chart-line fa-fw"></i> Dashboards

The best way of viewing your integrations and interacting with the site is through dashboards.
<img src="https://grafana.com/img/fav32.png" alt="Grafana" width="16"/> [Grafana](https://grafana.com/)
<sup title="grafana.com"><i class="fas fa-external-link-alt fa-xs"></i></sup>
is built-in to deliver these dashboards, and is the primary user interface.

<p class="example-block">
  <a target="_blank" href="/SITE_ID/?orgId=1"><i>Site Performance</i></a> - How is the edge server performing?<br/>
  <a target="_blank" href="/SITE_ID/?orgId=1"><i>User Activity</i></a> - How often are users accessing the site?<br/>
  <a target="_blank" href="/SITE_ID/alerting/list?orgId=1&state=alerting"><i>Outstanding Alerts</i></a> - What alerts are currently active?<br/>
</p>

### <i class="fa fa-chart-bar fa-fw"></i> Metrics

IoT devices and business integrations generate a lot of data.
<img src="https://avatars0.githubusercontent.com/u/8270030?s=200&v=4" alt="Statsd" width="16"/>
[Statsd](https://www.npmjs.com/package/statsd)
<sup title="npmjs.com/statsd"><i class="fas fa-external-link-alt fa-xs"></i></sup>
is used to collect and aggregate metrics into the built-in 
<img src="https://graphiteapp.org/img/favicon-32x32.png" alt="Graphite" width="16"/>
[Graphite](https://graphiteapp.org/)
<sup title="graphiteapp.org"><i class="fas fa-external-link-alt fa-xs"></i></sup>
time-series database.

<p class="example-block">
  <a target="_blank" href="/SITE_ID/graphite/"><i>Graphite</i></a> - View metrics directly in Graphite<br/>
  <a target="_blank" href="/SITE_ID/explore?left=%5B%22now-6h%22,%22now%22,%22Graphite%22,%7B%22datasource%22:%22Graphite%22,%22target%22:%22statsd.numStats%22%7D,%7B%22ui%22:%5Btrue,true,true,%22none%22%5D%7D%5D">
  <i>Grafana</i></a> - Explore metrics within a Grafana dashboard<br/>
</p>

### <i class="fa fa-database fa-fw"></i> Logging

Business events are recorded into a 
<img src="https://github.com/grafana/loki/raw/master/docs/logo.png" alt="Loki" width="16"/>
[Loki](https://grafana.com/loki)
<sup title="grafana.com/loki"><i class="fas fa-external-link-alt fa-xs"></i></sup>
logging database. These events can arrive from server logs, custom integrations,
or from IoT devices using the built-in
<img src="https://mosquitto.org/favicon-16x16.png" alt="Mosquitto" width="16"/>
[Mosquitto](https://mosquitto.org)
<sup title="mosquitto.org"><i class="fas fa-external-link-alt fa-xs"></i></sup>
data bus.

<p class="example-block">

  <a target="_blank" href="/SITE_ID/explore?left=%5B%22now-6h%22,%22now%22,%22Loki%22,%7B%22expr%22:%22%7Bservice%3D%5C%22nginx%5C%22%7D%20admin%22%7D,%7B%22ui%22:%5Btrue,true,true,%22none%22%5D%7D%5D">
    <i>User Activity</i>
  </a> - Inbound user activity logs<br/>
  <a target="_blank" href="/SITE_ID/explore?left=%5B%22now-6h%22,%22now%22,%22Loki%22,%7B%22expr%22:%22%7Bservice%3D%5C%22edge%5C%22%7D%22%7D,%7B%22ui%22:%5Btrue,true,true,%22none%22%5D%7D%5D">
    <i>Server Logs</i>
  </a> - Edge server logs<br/>

</p>

### <i class="fa fa-code-branch fa-rotate-90 fa-fw">&nbsp;</i> Automation

The edge server comes installed with the flow based
<img src="https://nodered.org/favicon.ico" alt="Node-Red" width="16"/>
[Node-Red](https://nodered.org)
<sup title="nodered.org"><i class="fas fa-external-link-alt fa-xs"></i></sup>
automation engine.
This makes it simple to integrate in-house systems with existing
[Node-Red plugins](https://flows.nodered.org)
<sup title="nodered.org"><i class="fas fa-external-link-alt fa-xs"></i></sup>
and easily build new plugins for backend systems.

Reporting is provided by the 
<img src="https://iot-edge.github.io/iot-edge-docs/_media/iot-edge-green-bg-16.png" width="16"/>
[IoT-Edge](https://github.com/iot-edge)
<sup title="github.com"><i class="fas fa-external-link-alt fa-xs"></i></sup>
server using the
<img src="https://google.com/chrome/static/images/favicons/favicon-16x16.png" width="16"/>
[Chrome Puppeteer](https://github.com/GoogleChrome/puppeteer)
<sup title="github.com"><i class="fas fa-external-link-alt fa-xs"></i></sup>
project. In addition to reporting, external site integration is easier with Puppeteer.

<p class="example-block">

  <a target="_blank" href="/SITE_ID/node-red/">
    <i>Automation Engine</i>
  </a> - Node Red application (for admins and site developers)<br/>
  <a target="_blank" href="/SITE_ID/node-red/">
    <i>Server Report</i>
  </a> - Weekly server report<br/>

</p>

### <i class="fa fa-cloud-download-alt fa-fw"></i> Plugins

The edge server lays the foundation for integration, and plugins get you there fast.

Plugins are pre-built connectors to external systems and common workflows.
You can use them as-is, or extend them with your own integrations and workflows.

<p class="example-block">

  <a target="_blank" href="/SITE_ID/nodered/">
    <i>Plugin Registry</i>
  </a> - Browse pre-built integrations and workflows<br/>
  <a target="_blank" href="#/plugins/">
    <i>Installed Plugins</i>
  </a> - Currently installed plugins<br/>

</p>
