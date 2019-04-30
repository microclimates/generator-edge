/* Microclimates Plugin Generator */

"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const path = require("path");
const deepExtend = require('deep-extend');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

  initializing() {

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

    // Create the plugin directory and change destination root if not already here
    if (path.basename(this.destinationPath()) !== this.model.pkgName) {
      this.log(`Creating folder ${this.model.pkgName}`);
      mkdirp(this.model.pkgName);
      this.destinationRoot(this.destinationPath(this.model.pkgName));
    }

    this.composeWith(require.resolve('generator-license'), {
      name: this.model.authorName,
      email: this.model.authorEmail,
      website: this.model.authorUrl,
      defaultLicense: this.model.license,
    });
    
  }

  writing() {

    // Copy all files on first run
    if (this.firstRun) {
      this.fs.copy(this.templatePath('**'), this.destinationPath());
    }

    // Add or update the package.json file
    let pkg = this.fs.readJSON(
      this.destinationPath("package.json"), 
      this.fs.readJSON(this.templatePath("package.json"),{})
    );
    pkg.name = this.model.pkgName;
    pkg.description = this.model.description;
    pkg.pluginName = this.model.pluginName;
    pkg.homepage = this.model.homepage;
    pkg.keywords = this.model.keywords;
    pkg.author.name = this.model.authorName;
    pkg.author.email = this.model.authorEmail;
    pkg.author.url = this.model.authorUrl;
    this.fs.write(this.destinationPath("package.json"), JSON.stringify(pkg,null,2));

    // Apply template to README.md file
    if (this.firstRun) {
      let readmeTemplate = _.template(this.fs.read(this.templatePath("README.md")));
      this.fs.write(this.destinationPath("README.md"), readmeTemplate(this.model));
    }

  }

  end() {
    if (this.firstRun) {
      this.config.set("projectType", "plugin");
      this.config.save();
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
