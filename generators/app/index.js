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
