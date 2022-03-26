"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { resolve } = require("path");
const mkdirp = require("mkdirp");
const getp = require("@jswork/generator-prompts");
const prompts = getp(["scope", "registry", "project_name", "description"]);
const globby = require("globby");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the lovely ${chalk.red("generator-tailwind")} generator!`
      )
    );
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // prepare
    console.log("writing.");
  }

  end() {
    console.log(`Add '@import "tailwind/dst.css";' to your style files`);
  }

  __copy() {}
};
