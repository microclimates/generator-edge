"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");

module.exports = class extends Generator {

  async initializing() {
    this.log(
        `This generator is currently ${chalk.red("under construction")}.`
    );
  }

};