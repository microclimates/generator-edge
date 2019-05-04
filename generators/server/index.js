/* Microclimates Plugin Generator */

"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const deepExtend = require('deep-extend');
const mtz = require('moment-timezone');
const DEFAULT_HTTP_PORT = 8000;
const DEFAULT_MQTT_PORT = 1883;
const DEFAULT_MQTT_WS_PORT = 9001;
const chalk = require('chalk');
const util = require('util');
const ini = require('ini');

module.exports = class extends Generator {
  
  async initializing() {

    this.firstRun = !this.config.get("projectType");

    // Get prior model values from the edge-env file
    let edgeEnv = {};
    if (!this.firstRun) {
      try {
        let iniFile = this.fs.readJSON('./edge-env');
        edgeEnv = ini.parse(iniFile);
      } catch(e){}
    }

    // Define the template data model for this generator type
    this.model = {
      proceed: true,
      siteId: edgeEnv.SITE_ID || 'edge',
      siteName: edgeEnv.SITE_NAME || "Edge Site",
      siteFQDN: edgeEnv.SITE_FQDN || "localhost",
      httpPort: edgeEnv.HTTP_PORT || DEFAULT_HTTP_PORT,
      mqttPort: edgeEnv.MQTT_PORT || DEFAULT_MQTT_PORT,
      mqttWebSocketPort: edgeEnv.MQTT_WS_PORT || DEFAULT_MQTT_WS_PORT,
      TZ: edgeEnv.TZ || mtz.tz.guess()
    }

  }

  async prompting() {

    const prompts = [
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Install an edge server in this directory',
        default: true
      },
      {
        name: 'siteName',
        message: 'What should I call this site',
        default: this.model.siteName
      },
      {
        name: 'siteId',
        message: 'What should the site ID be (short identifier)',
        default: this.model.siteId
      },
      {
        name: 'siteFQDN',
        message: 'What is the network name or IP address for this site',
        default: this.model.siteFQDN
      },
      {
        name: 'httpPort',
        message: 'What HTTP port should this server listen on (80,8080,...)',
        default: this.model.httpPort
      },
      {
        name: 'mqttPort',
        message: 'What MQTT port should the server listen on',
        default: this.model.mqttPort
      },
    ]

    deepExtend(this.model, await this.prompt(prompts));
    if (!this.model.proceed) {
      this.log('OK - not installing an edge server here');
      process.exit(1);
    }
  }

  async writing() {

    // Obtain a silent mem-fs store
    var store = require("mem-fs").create();
    var fs = require("mem-fs-editor").create(store);

    // Offset the MQTT socket port the same as the mqtt port offset
    this.model.mqttWebSocketPort = DEFAULT_MQTT_WS_PORT + (this.model.mqttPort - DEFAULT_MQTT_PORT);

    // Start by copying all files
    fs.copy(this.templatePath('**'), this.destinationPath(), { globOptions: { dot: true } });

    // Apply data model to template files
    const templateFiles = [
      ".env"
    ]
    templateFiles.forEach((filename)=> {
      let tmpl = _.template(fs.read(this.templatePath(filename)));
      fs.write(this.destinationPath(filename), tmpl(this.model));
    });

    // Commit changes
    const commit = util.promisify(fs.commit.bind(fs));
    await commit([]);

  }

  end() {

    this.log("");
    this.log(`Your site has been created.`);
    this.log(`Run ${chalk.red("npm start")} to start, then open ${chalk.red("http://" + this.model.siteFQDN + ":" + this.model.httpPort)} to view.`)
    this.log("");

    if (this.firstRun) {
      this.config.set("projectType", "edge");
      this.config.save();
    }

  }

};