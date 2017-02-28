'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var pluralize = require('pluralize');
var fileSys = require('fs');
var path = require("path");

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('inputName', { type: String, required: true });

    this.option('tpl', {
      type: Boolean,
      default: false
    });

    this.option('css', {
      desc: 'adds a css layout file for the component',
      type: Boolean,
      default: false
    });

    this.option('scss', {
      desc: 'adds a css layout file for the component',
      type: Boolean,
      default: false
    });

    // this.option('p', {
    //     type: Boolean,
    //     default: true
    // });
  },

  configuring() {
    let path = this.inputName.split('/');
    let hasPath = path.length > 1;

    let moduleName = path[path.length - 1];

    let pathName = "";
    let max = path.length - 1;

    for (var i = 0; i < max; i++) {
      pathName = pathName + path[i] + "/";
    }

    let singular = _.camelCase(moduleName);
    let plural = pluralize(moduleName); // _.camelCase(name) + 's';
    let className = singular[0].toUpperCase() + singular.substr(1); // _.startCase(singular); // singular.replace(' ', '');
    let properPlural = plural[0].toUpperCase() + plural.substr(1);
    //let route = 
    let settings = {
      modulePath: pathName + _.kebabCase(singular) + '/',
      singularKebabName: _.kebabCase(singular)
    }

    this.args = settings;

  },
  writing() {
    this.options['p'] = false;
    this.options['m'] = false;
    this.options['s'] = false;
    this.options['d'] = false;
    this.options['c'] = false;
    this.options['pipe'] = true;
    this.composeWith(require.resolve('../item'), { args: [this.args.modulePath, this.args.singularKebabName], options: this.options });
  },
  end() {

  }


});
