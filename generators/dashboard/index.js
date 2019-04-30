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

/* Yeoman run groups - special method names that get executed in groups
 *  https://yeoman.io/authoring/running-context.html
 *
 * initializing - Your initialization methods (checking current project state, getting configs, etc)
 * prompting - Where you prompt users for options (where you’d call this.prompt())
 * configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
 * default (+others not starting with _) - If the method name doesn’t match a priority, it will be pushed to this group.
 * writing - Where you write the generator specific files (routes, controllers, etc)
 * conflicts - Where conflicts are handled (used internally)
 * install - Where installations are run (npm, bower)
 * end - Called last, cleanup, say good bye, etc
 *
 * async initializing() {}
 * async prompting() {}
 * async configuring() {}
 * async default() {}
 * async writing() {}
 * async conflicts() {}
 * async install() {}
 * async end() {}
 */
