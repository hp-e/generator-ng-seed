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

    var singular = this.props.className;
    var plural = this.props.classNamePlural;

    var args = {
     
      singularLowerName: singular.toLowerCase(),
      singularName: _.startCase(singular),
      pluralLowerName: plural.toLowerCase(),
      pluralName: _.startCase(plural)
    }

    

    var destRoot = "src/app/" + args.singularLowerName + '/';
    // root files
    this.fs.copyTpl(this.templatePath(root + '_ng2.Service.ts'), this.destinationPath(destRoot + args.singularName +  '.Service.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Module.ts'), this.destinationPath(destRoot + args.singularName +  '.Module.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Routing.Module.ts'), this.destinationPath(destRoot + args.singularName +  '.Routing.Module.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Pages.ts'), this.destinationPath(destRoot + args.singularName +  '.Pages.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Components.ts'), this.destinationPath(destRoot + args.singularName +  '.Components.ts'), args);
    this.fs.copyTpl(this.templatePath(root + '_ng2.Models.ts'), this.destinationPath(destRoot + args.singularName +  '.Models.ts'), args);

    //models
    this.fs.copyTpl(this.templatePath(root + 'models/'+ '_ng2.Model.ts'), this.destinationPath(destRoot + 'models/' + args.singularName +  '.Model.ts'), args);
    
    //pages
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularName +  '.Index.Page.ts'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularName +  '.Index.Page.html'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularName +  '.Index.Page.css'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Edit.Page.ts'), this.destinationPath(destRoot + 'pages/' + args.singularName +  '.Edit.Page.ts'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.html'), this.destinationPath(destRoot + 'pages/' + args.singularName +  '.Edit.Page.html'), args);
    this.fs.copyTpl(this.templatePath(root + 'pages/'+ '_ng2.Index.Page.css'), this.destinationPath(destRoot + 'pages/' + args.singularName +  '.Edit.Page.css'), args);

  }
});
