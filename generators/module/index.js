'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var pluralize = require('pluralize');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('inputName', { type: String, required: true });
    //this.className = _.kebabCase(this.className);

    this.option('p', {
      desc: 'If true, the pages folder and pages files will not be created',
      type: Boolean,
      default: false
    });

   
    this.option('c', {
      desc: 'If true, the components folder and components file will not be created',
      type: Boolean,
      default: false
    });

    
   
    this.option('m', {
      desc: 'If true, the models folder and models file will not be created',
      type: Boolean,
      default: false
    });

    this.option('r', {
      desc: 'If true, the routing file will not be created',
      type: Boolean,
      default: false
    });


    this.option('all', {
      desc: 'If true, page, component, routing and model will be created',
      type: Boolean,
      default: false
    });
    
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
    this._writeNg2App();
  },

  _writeNg2App: function () {

    let defaultConfigPath = this.destinationPath('ng-seed.json');
    
    if (!fileSys.existsSync(defaultConfigPath)) {
      defaultConfigPath = path.join(__dirname, '..', 'init', 'templates', '_ng-seed.json');
      this.composeWith('ng-seed:init');
    }

    let internalConfig = this.fs.readJSON(defaultConfigPath);

    let path = this.inputName.split('/');
    let hasPath = path.length > 1;

    this.log(path.length);
    let className = path[path.length -1];

    this.log(className);
    
    let pathName = "";   
    let max = path.length - 1; 
   
    for (var i = 0; i < max; i++) {
      pathName = pathName + path[i] + "/";
    }
        
    let subs = className.split(',');
    
    let addPage = this.options['p'] || this.options['all'] ? true : false;
    let addModel = this.options['m'] || this.options['all'] ? true : false;
    let addComponent = this.options['c'] || this.options['all'] ? true : false;
    let addRouting = this.options['r'] || this.options['all'] ? true : false;
    
    let moduleFilePostfix = internalConfig.module.filePostfix ? internalConfig.module.filePostfix : ".module" ;
    let classNamePostfix = internalConfig.module.classNamePostfix ? internalConfig.module.filePostfix : "Module";

    for (var i = 0; i < subs.length; i++) {
      let name = subs[i];

      let singular = _.camelCase(name);
      let plural = pluralize(name); // _.camelCase(name) + 's';
      let className = singular[0].toUpperCase() + singular.substr(1); // _.startCase(singular); // singular.replace(' ', '');
      let properPlural = plural[0].toUpperCase() + plural.substr(1);
      //let route = 
      let args = {
        path: pathName,
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
        skipPages: addPage,
        skipModels: addModel,
        skipComponents: skipComponents,
        skipRouting: addRouting || addPage
      }

      //this.log(args);
      this._writeNg2SubPage(args);

    }
  },

  _writeNg2SubPage(args) {
    var root = "ng2/";
    var destRoot = "src/app/" + args.path + args.singularKebabName + '/';
    // root files
    this.fs.copyTpl(this.templatePath(root + '_readme.md'), this.destinationPath(destRoot + 'readme.md'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Service.ts'), this.destinationPath(destRoot + args.singularKebabName + '.service.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Module.ts'), this.destinationPath(destRoot + args.singularKebabName + '.module.ts'), args);

    if (!args.skipRouting) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.Routing.Module.ts'), this.destinationPath(destRoot + args.singularKebabName + '.routing.module.ts'), args);
    }

    //models
    if (!args.skipModels) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.Models.ts'), this.destinationPath(destRoot + args.singularKebabName + '.models.ts'), args);
      this.fs.copyTpl(this.templatePath(root + 'models/' + '_ng2.Model.ts'), this.destinationPath(destRoot + 'models/' + args.singularKebabName + '.model.ts'), args);
    }

    //components
    if (!args.skipComponents) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.Components.ts'), this.destinationPath(destRoot + args.singularKebabName + '.components.ts'), args);
      this.fs.copyTpl(this.templatePath(root + 'components/' + '_ng2.Component.ts'), this.destinationPath(destRoot + 'components/' + args.singularKebabName + '.component.ts'), args);
      this.fs.copyTpl(this.templatePath(root + 'components/' + '_ng2.Component.html'), this.destinationPath(destRoot + 'components/' + args.singularKebabName + '.component.html'), args);
    }
    //pages    

    if (!args.skipPages) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.Pages.ts'), this.destinationPath(destRoot + args.singularKebabName + '.pages.ts'), args);
      this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '-index.page.ts'), args);
      this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '-index.page.html'), args);
      this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '-index.page.css'), args);
      // this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Edit.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.edit.page.ts'), args);
      // this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.edit.page.html'), args);
      // this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.edit.page.css'), args);
    }
  }
});
