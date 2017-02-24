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
    let defaultConfigPath = this.destinationPath('ng-seed.json');

    if (!fileSys.existsSync(defaultConfigPath)) {
      defaultConfigPath = path.join(__dirname, '..', 'init', 'templates', '_ng-seed.json');
      this.composeWith('ng-seed:init');
    }

    let internalConfig = this.fs.readJSON(defaultConfigPath);

    let path = this.inputName.split('/');
    let hasPath = path.length > 1;

    let moduleName = path[path.length - 1];

    let pathName = "";
    let max = path.length - 1;

    for (var i = 0; i < max; i++) {
      pathName = pathName + path[i] + "/";
    }

    // let addPage = this.options['p'] || this.options['all'] ? true : false;
    // let addModel = this.options['m'] || this.options['all'] ? true : false;
    // let addComponent = this.options['c'] || this.options['all'] ? true : false;
    // let addRouting = this.options['r'] || this.options['all'] ? true : false;

    let moduleFilePostfix = internalConfig.module.filePostfix ? internalConfig.module.filePostfix : ".module";
    let moduleNamePostfix = internalConfig.module.classNamePostfix ? internalConfig.module.filePostfix : "Module";

    let singular = _.camelCase(moduleName);
    let plural = pluralize(moduleName); // _.camelCase(name) + 's';
    let className = singular[0].toUpperCase() + singular.substr(1); // _.startCase(singular); // singular.replace(' ', '');
    let properPlural = plural[0].toUpperCase() + plural.substr(1);
    //let route = 
    let settings = {
      path: pathName,
      modulePath: pathName + _.kebabCase(singular) + '/',
      className: className,
      classNameLower: className.toLowerCase(),
      fileName: _.kebabCase(singular),
      port: 3000, // need to read from config,
      singularLowerName: className.toLowerCase(),
      singularName: className,
      pluralLowerName: plural.toLowerCase(),
      pluralName: properPlural,
      singularKebabName: _.kebabCase(singular),
      pluralKebabName: _.kebabCase(plural),
      singularCamel: singular,
      skipRouting: false,
      addService: !this.options['s'],
      lazyLoading: this.options['lazy']
    }

    this.internalConfig = internalConfig;
    this.args = settings;

  },
  writing() {
    this.options['p'] = false;
    this.options['m'] = false;
    this.options['s'] = true;
    this.options['d'] = false;
    this.options['c'] = false;
    this.composeWith(require.resolve('../item'), { args: [this.args.modulePath, this.args.singularKebabName], options: this.options });
  },
  end() {  
          
  }


});
