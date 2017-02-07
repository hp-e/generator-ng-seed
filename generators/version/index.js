'use strict';
var yeoman = require('yeoman-generator');
// var chalk = require('chalk');
// var yosay = require('yosay');
// var _ = require('lodash');
// var pluralize = require('pluralize');
var fileSys = require('fs');
var path = require("path");

module.exports = yeoman.Base.extend({
    constructor: function(){
        yeoman.Base.apply(this, arguments);

        this.option('cl', {
           desc: 'show the changelog',
           type: Boolean,
           default: false 
        });
     // this.log("constructor")    
    },
  // initializing: function() {
  //   this.log("initializing")   
  // },
  // prompting: function() {
  //   this.log("prompting")   
  // },
  // configuring: function() {
  //   this.log("configuring")   
  // },
  // default: function() {
  //   this.log("default")   
  // },
  // writing: function() {
  //   this.log("writing")   
  // },
  // conflicts: function() {
  //   this.log("conflicts")   
  // },
  // install: function() {
  //   this.log("install")   
  // },
  end: function() {
    let currentPath = path.join(__dirname, '..', '..', 'package.json');
    let packageJson = this.fs.readJSON(currentPath);    
    this.log("Current Version for this Generator is: ", packageJson.version);
    //this.log("Current Version: ", currentPath);
    
    if (this.options['cl']) {
      this.log("ng-seed changelog");
      var content = fileSys.readFileSync(path.join(__dirname, '..', '..', 'CHANGELOG.md'), 'utf8');
      this.log(content);
    }

    // if (this.options['cl']) {
    //   this.log("Show Changelog");
    // }

  }
  
});
