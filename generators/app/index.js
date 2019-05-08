/* Entry point for yo mc-plugin */
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {

  initializing() {

    // First time runs the plugin generator, then the chooser
    this.projectType = this.config.get("projectType");
    this.firstRun = this.projectType == undefined;
    this.composeWith(require.resolve("../chooser"), {});
    this.origRoot = this.destinationRoot();
  }

  async prompting() {
    this.log(
      yosay(
`Welcome to the 
${chalk.red("IoT Edge Server")}
code generator`)
    );
  }

  writing() {
  }

  end() {
    // Fix a bug where it doesn't write the rc file in the right place
    if (this.origRoot != this.destinationRoot()) {
      setTimeout(function(){
        this.fs.move(this.origRoot + "/.yo-rc.json", this.destinationPath(".yo-rc.json"));
      }.bind(this), 100);
    }
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