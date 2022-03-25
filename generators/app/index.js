"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const globby = require("globby");
const { resolve } = require("path");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the lovely ${chalk.red("generator-tailwind")} generator!`
      )
    );

    this.argument("styles", { type: String, default: "./src/assets/styles" });
  }

  writing() {
    // prepare
    const stylesPath = this.destinationPath(this.options.styles);
    mkdirp.sync(stylesPath);

    // tailwind dir
    this.fs.copy(
      globby.sync(this.templatePath("tailwind/**"), { dot: true }),
      stylesPath
    );

    // tailwind.config.js
    this.fs.copy(
      this.templatePath("tailwind.config.js"),
      this.destinationPath(resolve("tailwind.config.js"))
    );
  }

  end() {
    console.log(`Add '@import "tailwind/dst.css";' to your style files`);
  }

};
