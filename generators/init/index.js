'use strict';
var yeoman = require('yeoman-generator');
// var chalk = require('chalk');
// var yosay = require('yosay');
// var _ = require('lodash');
// var pluralize = require('pluralize');
// var fileSys = require('fs');
// var path = require("path");

module.exports = yeoman.Base.extend({
    constructor: function(){
        yeoman.Base.apply(this, arguments);
        
    },
    
  writing: function () {
    this.fs.copyTpl(this.templatePath('_ng-seed.json'), this.destinationPath('ng-seed.json'));
  },
  
});
