"use strict";
const Generator = require("yeoman-generator");

const firstRunGenerators = [
  { name: '1 - Edge Server', value: 'edge' },
  { name: '2 - Edge Server Plugin', value: 'plugin' },
];

const pluginGenerators = [
  { name: '1 - Dashboards', value: 'dashboards' },
  { name: '2 - Devices', value: 'devices' },
];

const edgeGenerators = [
  { name: '1 - Update edge server', value: 'edge' },
];

module.exports = class extends Generator {

  async prompting() {

    // Select the chooser based on the project initialization type 
    let generatorType = this.config.get("projectType");
    var generators = firstRunGenerators;
    if (generatorType == "edge") {
      generators = edgeGenerators;
    }
    else if (generatorType == "plugin") {
      generators = pluginGenerators;
    }

    const prompts = [
      {
        type: 'list',
        name: 'generator',
        optional: false,
        message: "What would you like me to code for you today",
        choices: generators
      }
    ];

    this.model = await this.prompt(prompts);
    this.composeWith(require.resolve("../" + this.model.generator), {});
  }

};
