"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

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
    // tailwind dir
    this.fs.copy(
      this.templatePath("tailwind/**"),
      this.destinationPath(this.option.styles)
    );

    // tailwind.config.js
    this.fs.copy(
      this.templatePath("tailwind.config.js"),
      this.destinationPath()
    );
  }

  end() {
    console.log(`Add '@import "tailwind/dst.css";' to your style files`);
  }
};
