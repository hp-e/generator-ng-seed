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

    //this.className = _.kebabCase(this.className);

    this.option('p', {
      desc: 'If true, you will be asked about pages to add',
      type: Boolean,
      default: false
    });

    this.option('c', {
      desc: 'If true, you will be asked about components to add',
      type: Boolean,
      default: false
    });

    this.option('m', {
      desc: 'If true, you will be asked about models to add',
      type: Boolean,
      default: false
    });

    this.option('s', {
      desc: 'If true, you will be asked about services to add',
      type: Boolean,
      default: false
    });

    this.option('lazy', {
      type: Boolean,
      default: false
    });
    this.option('no-barrel', {
      type: Boolean,
      default: false
    });

    this.option('v', {
      type: Boolean,
      default: false
    });


    this.option('scss', {
      desc: 'adds a scss layout file for the component',
      type: Boolean,
      default: false
    });

    this.option('css', {
      desc: 'adds a css layout file for the component',
      type: Boolean,
      default: false
    });

    // this.option('r', {
    //   desc: 'If true, the routing file will not be created',
    //   type: Boolean,
    //   default: false
    // });


    // this.option('all', {
    //   desc: 'If true, page, component, routing and model will be created',
    //   type: Boolean,
    //   default: false
    // });
    //require.resolve('../turbo')
  },

  initializing() {


  },


  configuring() {
    let defaultConfigPath = this.destinationPath('ng-seed.json');

    if (!fileSys.existsSync(defaultConfigPath)) {
      defaultConfigPath = path.join(__dirname, '..', 'init', 'templates', '_ng-seed.json');
      this.composeWith('ng-seed:init');
    }

    let internalConfig = this.fs.readJSON(defaultConfigPath);

    let pathParts = this.inputName.split('/');
    let hasPath = pathParts.length > 1;

    let moduleName = pathParts[pathParts.length - 1];

    let pathName = "";
    let max = pathParts.length - 1;

    for (var i = 0; i < max; i++) {
      pathName = pathName + pathParts[i] + "/";
    }

    //console.log(pathName);
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

    let skipRouting = !internalConfig.module.addRouting;
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
      skipRouting: skipRouting,
      useBarrel: this.options['no-barrel'] ? false : internalConfig.module.useBarrel,
      addService: this.options['s'] ? true : internalConfig.module.addService,
      lazyLoading: this.options['lazy']
    }

    this.internalConfig = internalConfig;
    this.args = settings;
  },

  default() {


  },

  prompting: function () {

    if (!this.inputName) {
      var prompts = [
        {
          name: 'inputName',
          message: 'What is the SINGULAR class name?',
          require: true,
        }
      ];

      return this.prompt(prompts).then(function (props) {
        // To access props later use this.props.someAnswer;
        this.inputName = props.inputName;
        //this.props = props;
      }.bind(this));
    }
  },

  writing: function () {

    //console.log("Writing files with: ", this.args);
    let root = "ng2/";
    let destRoot = "src/app/" + this.args.path + this.args.singularKebabName + '/';
    let destRootName = destRoot + this.args.singularKebabName;

    // root files
    this.fs.copyTpl(this.templatePath(root + '_readme.md'), this.destinationPath(destRoot + 'readme.md'), this.args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Module.ts'), this.destinationPath(destRootName + '.module.ts'), this.args);

    

    if (this.args.addService) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.Service.ts'), this.destinationPath(destRootName + '.service.ts'), this.args);
    }


    if (this.args.useBarrel) {
      this.fs.copyTpl(this.templatePath(root + '_exports.ts'), this.destinationPath(destRootName + '.exports.ts'), this.args);
    }

    if (!this.args.skipRouting) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.Routing.Module.ts'), this.destinationPath(destRootName + '.routing.module.ts'), this.args);
    }
    //if (!args.skipRouting) {


    let loadSubmodule = this.options['p'] || this.options['m'] || this.options['s'] || this.options['c'] || this.options['d'] || this.options['pipe'];
    if (loadSubmodule) {
      this.composeWith(require.resolve('../item'), { args: [this.args.modulePath, this.args.singularKebabName], options: this.options });
    }
  },
  end() {

  }
});
