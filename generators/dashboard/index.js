/* Grafana Dashboard Generator */
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

module.exports = class extends Generator {

  async initializing() {}
  async prompting() {

    const prompts = [
      {
        type: "input",
        name: "pluginName",
        message: "Plugin name",
        default: "My Plugin Name"
      },
    ];

    this.answers = await this.prompt(prompts);
  }

  async configuring() {}

  async default() {

    const readmeTpl = _.template(this.fs.read(this.templatePath("README.md")));

    this.composeWith(require.resolve("generator-node/generators/git"), {
    });

  }

};