'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var pluralize = require('pluralize');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('className', { type: String, required: false });
    this.className = _.kebabCase(this.className);

    this.option('skip-pages', {
      desc: 'If true, the pages folder and pages files will not be created',
      type: Boolean,
      default: false
    });

    this.option('sp', {
      desc: 'If true, the pages folder and pages files will not be created',
      type: Boolean,
      default: false
    });

    this.option('skip-components', {
      desc: 'If true, the components folder and components file will not be created',
      type: Boolean,
      default: false
    });

    this.option('sc', {
      desc: 'If true, the components folder and components file will not be created',
      type: Boolean,
      default: false
    });

    this.option('skip-models', {
      desc: 'If true, the models folder and models file will not be created',
      type: Boolean,
      default: false
    });

    this.option('sm', {
      desc: 'If true, the models folder and models file will not be created',
      type: Boolean,
      default: false
    });

    this.option('skip-routing', {
      desc: 'If true, the routing file will not be created',
      type: Boolean,
      default: false
    });

    this.option('sr', {
      desc: 'If true, the routing file will not be created',
      type: Boolean,
      default: false
    });

    this.option('skip-all', {
      desc: 'If true, either pages, components, routing or models will be created',
      type: Boolean,
      default: false
    });

    this.option('sa', {
      desc: 'If true, either pages, components, routing or models will be created',
      type: Boolean,
      default: false
    });

  },

  prompting: function () {

    if (!this.className) {
    var prompts = [
      {
        name: 'className',
        message: 'What is the (singular) class name (need more than one? enter class names separated by SPACE)?',
        require: true,
      }
    ];
    
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.className = props.className;
      //this.props = props;
    }.bind(this));
    }
  },

  writing: function () {
    this._writeNg2App();
  },

  _writeNg2App: function () {


    var subs = this.className.split(' ');
    
    var skipPages = this.options['skip-pages'] || this.options['sp'] || this.options['skip-all'] || this.options['sa'] ? true : false;
    var skipModels = this.options['skip-models'] || this.options['sm'] || this.options['skip-all'] || this.options['sa'] ? true : false;
    var skipComponents = this.options['skip-components'] || this.options['sc'] || this.options['skip-all'] || this.options['sa'] ? true : false;
    var skipRouting = this.options['skip-routing'] || this.options['sr'] || this.options['skip-all'] || this.options['sa'] ? true : false;
    
    for (var i = 0; i < subs.length; i++) {
      var name = subs[i];

      var singular = _.camelCase(name);
      var plural = pluralize(name); // _.camelCase(name) + 's';
      var className = singular[0].toUpperCase() + singular.substr(1); // _.startCase(singular); // singular.replace(' ', '');
      var properPlural = plural[0].toUpperCase() + plural.substr(1);
      //var route = 
      var args = {
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
        skipPages: skipPages,
        skipModels: skipModels,
        skipComponents: skipComponents,
        skipRouting: skipRouting || skipPages
      }

      //this.log(args);
      this._writeNg2SubPage(args);

    }
  },

  _writeNg2SubPage(args) {
    var root = "ng2/";
    var destRoot = "src/app/" + args.singularKebabName + '/';
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
      this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.index.page.ts'), args);
      this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.index.page.html'), args);
      this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.index.page.css'), args);
      // this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Edit.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.edit.page.ts'), args);
      // this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.edit.page.html'), args);
      // this.fs.copyTpl(this.templatePath(root + 'pages/' + '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName + '.edit.page.css'), args);
    }
  }
});
