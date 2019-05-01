/* Edge Server Plugin Generator */
"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const path = require("path");
const deepExtend = require('deep-extend');
const chalk = require('chalk');
const util = require('util');

module.exports = class extends Generator {

  initializing() {

    // This should never be called if not first run
    this.firstRun = !this.config.get("projectType");
    let pkg = this.fs.readJSON(this.destinationPath("package.json"), {});

    // Define the template data model for this generator type
    this.model = {
      pluginName: pkg.pluginName || "My Plugin Name",
      pkgName: pkg.name || path.basename(this.destinationRoot()),
      description: pkg.description || "",
      pkgVersion: pkg.version || "1.0.0",
      homepage: pkg.homepage || "",
      keywords: pkg.keywords || [],
      author: pkg.author || {
        name: this.user.git.name() || "",
        email: this.user.git.email() || "",
        url: ""
      },
      license: pkg.license || "MIT",
    }

  }

  async prompting() {

    const prompts = [
      {
        name: "pkgName",
        message: "Module name",
        default: this.model.pkgName,
      },
      {
        name: "pluginName",
        message: "Plugin name",
        default: this.model.pluginName,
      },
      {
        name: "description",
        message: "Description",
        default: this.model.description,
      },

      {
        name: 'homepage',
        message: 'Project homepage url',
        default: this.model.homepage,
      },
      {
        name: 'authorName',
        message: "Author's Name",
        default: this.model.author.name,
      },
      {
        name: 'authorEmail',
        message: "Author's Email",
        default: this.model.author.email,
      },
      {
        name: 'authorUrl',
        message: "Author's Homepage",
        default: this.model.author.url,
      },
      {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        default: this.model.keywords.join(','),
        filter(words) {
          return words.split(/\s*,\s*/g);
        }
      },
    ];

    deepExtend(this.model, await this.prompt(prompts));
  }

  default() {

    this.composeWith(require.resolve('generator-license'), {
      name: this.model.authorName,
      email: this.model.authorEmail,
      website: this.model.authorUrl,
      defaultLicense: this.model.license,
    });
    
  }

  async writing() {

    // Obtain a silent mem-fs store
    // var store = require("mem-fs").create();
    // var fs = require("mem-fs-editor").create(store);
    var fs = this.fs;

    // Start by copying all files
    fs.copy(this.templatePath('**'), this.destinationPath(), { globOptions: { dot: true } });

    // Apply data model to template files
    const templateFiles = [
      "package.json", "README.md"
    ]
    templateFiles.forEach((filename)=> {
      let tmpl = _.template(fs.read(this.templatePath(filename)));
      fs.write(this.destinationPath(filename), tmpl(this.model));
    });

    // Commit changes
    // const commit = util.promisify(fs.commit.bind(fs));
    // await commit([]);
  }

  end() {
    if (this.firstRun) {
      this.config.set("projectType", "plugin");
      this.config.save();
    }

    this.log("");
    this.log(`Your plugin has been created.`);
    this.log(`Run ${chalk.red("yo edge")} to start building plugin components.`)
    this.log("");
  }

};