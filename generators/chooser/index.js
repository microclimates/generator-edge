"use strict";
const Generator = require("yeoman-generator");

const firstRunGenerators = [
  { name: '1 - Edge Server', value: 'server' },
  { name: '2 - Edge Server Plugin', value: 'plugin' },
];

const pluginGenerators = [
  { name: '1 - Dashboards', value: 'dashboard' },
  { name: '2 - Devices', value: 'device' },
];

module.exports = class extends Generator {

  async prompting() {

    // Select the chooser based on the project initialization type 
    let generatorType = this.config.get("projectType");
    var generators = firstRunGenerators;
    if (generatorType == "edge") {
      return this.composeWith(require.resolve("../server"), {});
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
