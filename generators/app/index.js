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
    this.__copy();
    this.__extendJSON();
  }

  end() {
    console.log(`Add '@import "tailwind/dst.css";' to your style files`);
  }

  __copy() {
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

  __extendJSON() {
    const scripts = `tailwindcss -i ${this.options.styles}/tailwind/src.css -o ${this.options.styles}/tailwind/dst.css`;
    const pkgJson = {
      scripts: {
        "tailwind:watch": `${scripts} --watch`,
        "tailwind:build": `${scripts} --minify`
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }
};
