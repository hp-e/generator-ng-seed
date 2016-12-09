'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  init: function () {

  },

  prompting: function () {      
    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Welcome to this fantastic ' + chalk.red('Angular - Seed') + ' generator!'
    // ));
        
    var prompts = [    
      {
        name: 'className',
        message: 'What is the singular class name ?',
        require: true,        
      },
      {
        name: 'classNamePlural',
        message: 'What is the plural class name ?',
        require: true, 
      }
    ];
    

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this._writeNg2App();    
  },
  
  _writeNg2App: function () {
    var root = "ng2/";

    var singular = _.camelCase(this.props.className);
    var plural = _.camelCase(this.props.classNamePlural);    
    var className = singular[0].toUpperCase() + singular.substr(1); // _.startCase(singular); // singular.replace(' ', '');
    var properPlural = plural[0].toUpperCase() + plural.substr(1);
    //var route = 
    var args = {
      
      singularLowerName: className.toLowerCase(),
      singularName: className,
      pluralLowerName: plural,
      pluralName: properPlural,
      singularKebabName: _.kebabCase(singular),
      pluralKebabName: _.kebabCase(plural),
      singularCamel: singular
    }

   // this.log(args);

    var destRoot = "src/app/" + args.singularKebabName + '/';
    // root files
    this.fs.copyTpl(this.templatePath(root + '_ng2.Service.ts'), this.destinationPath(destRoot + args.singularKebabName +  '.service.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Module.ts'), this.destinationPath(destRoot + args.singularKebabName +  '.module.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Routing.Module.ts'), this.destinationPath(destRoot + args.singularKebabName +  '.routing.module.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Pages.ts'), this.destinationPath(destRoot + args.singularKebabName +  '.pages.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Components.ts'), this.destinationPath(destRoot + args.singularKebabName +  '.components.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Models.ts'), this.destinationPath(destRoot + args.singularKebabName +  '.models.ts'), args);

    //models
    this.fs.copyTpl(this.templatePath(root + 'models/'+ '_ng2.Model.ts'), this.destinationPath(destRoot + 'models/' + args.singularKebabName +  '.model.ts'), args);
    
    //pages
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName +  '.index.page.ts'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName +  '.index.page.html'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName +  '.index.page.css'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Edit.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName +  '.edit.page.ts'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName +  '.edit.page.html'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularKebabName +  '.edit.page.css'), args);

  }
});
