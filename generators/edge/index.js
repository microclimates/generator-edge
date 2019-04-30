/* Microclimates Plugin Generator */

"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const deepExtend = require('deep-extend');
const mtz = require('moment-timezone');
const LOCAL_JSON_FILENAME = "./config/edge/local.json";
const DEFAULT_HTTP_PORT = 8000;
const DEFAULT_MQTT_PORT = 1883;
const DEFAULT_MQTT_WS_PORT = 9001;
const chalk = require('chalk');
const util = require('util');

module.exports = class extends Generator {
  
  async initializing() {

    this.firstRun = !this.config.get("projectType");

    // Define the template data model for this generator type
    this.model = {
      proceed: true,
      siteId: 'edge',
      siteName: "Edge Site",
      httpPort: DEFAULT_HTTP_PORT,
      mqttPort: DEFAULT_MQTT_PORT,
      mqttWebSocketPort: DEFAULT_MQTT_WS_PORT,
      TZ: mtz.tz.guess()
    }

    // Better defaults on subsequent runs
    if (!this.firstRun) {
      try {
        let localJSON = this.fs.readJSON(LOCAL_JSON_FILENAME)["iot-edge"];
        this.model.siteId = localJSON.site.id;
        this.model.siteName = localJSON.site.name;
        this.model.TZ = localJSON.site.TZ;
        this.model.httpPort = localJSON.externalExposure.httpPort;
        this.model.mqttPort = localJSON.externalExposure.mqttPort;
        this.model.mqttWebSocketPort = localJSON.externalExposure.mqttWebSocketPort;
      } catch(e){}
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
    fs.copy(this.templatePath('**'), this.destinationPath());

    // Apply data model to template files
    const templateFiles = [
      "package.json", "README.md", "docker-compose.yml", "edge-env",
      "config/nginx/iot-edge.conf", "./config/edge/local.json"
    ]
    templateFiles.forEach((filename)=> {
      let tmpl = _.template(fs.read(this.templatePath(filename)));
      fs.write(this.destinationPath(filename), tmpl(this.model));
    });

    // Commit changes
    const commit = util.promisify(fs.commit.bind(fs));
    await commit([]);

    // Install iot-edge NPM package
    this.log("");
    this.log(`Installing the latest ${chalk.red("iot-edge")} package from NPM`)
    this.log("");
    this.spawnCommandSync('npm', ['install', '--silent', 'iot-edge'], {cwd:process.cwd(), shell:true});
    this.log("");
    this.log(`Your site has been created.`);
    this.log(`Run ${chalk.red("npm start")} to start, then open ${chalk.red("http://localhost:" + this.model.httpPort)} to view.`)
    this.log("");

  }

  end() {

    if (this.firstRun) {
      this.config.set("projectType", "edge");
      this.config.save();
    }

  }

};