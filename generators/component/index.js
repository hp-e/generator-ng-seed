'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var pluralize = require('pluralize');
var fileSys = require('fs');
var path = require("path");

module.exports = yeoman.Base.extend({
    constructor: function(){
        yeoman.Base.apply(this, arguments);
        this.option('inline', {
           desc: 'uses inline template and style',
           type: Boolean,
           default: false 
        });
    },
  
  init: function () {

  },

  _getDirectories: function(p) {      
      let folderItems = [];
      var files = fileSys.readdirSync(p).filter(function(file) {
        return fileSys.statSync(path.join(p, file)).isDirectory();
      });     

      files.forEach((file) => {
        var folderItem = {
          name: file,
          value: file
        }          
          folderItems.push(folderItem);
      });               

      return folderItems;
  },

  prompting: function () {    
      
      var folders = this._getDirectories(this.destinationPath("src/app/"));
                 
      
      //this.log(folders);
      var prompts = [
        {
        type: 'list',
        name: 'moduleName',
        message: 'Please select the module to add the pages to',
        require: true,
        choices: folders    
        },      
      // {
      //   name: 'moduleName',
      //   message: 'What is the name of the parent folder for the new page (src/app/<folder> must exists)',
      //   require: true,
      // },
      {
        name: 'pageName',
        message: 'What is the component name (need more than one? enter names separated by SPACE)?',
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
    

    var subs = this.props.pageName.split(' ');

    for (var i = 0; i < subs.length; i++) {
      var name = subs[i];
      
      var page = _.camelCase(name);
      
      var pageName = page[0].toUpperCase() + page.substr(1); 
      var args = {
        moduleName: this.props.moduleName,
        pageName: _.kebabCase(page),
        className: pageName,                        
      }

      this._writeNg2SubPage(args);
    
    }    
  },

  _writeNg2SubPage(args ) {
    var root = "ng2/";
    var destRoot = this.destinationPath("src/app/" + args.moduleName);
    var pageRoot = this.destinationPath(destRoot + '/components/');
    var pagesFile = this.destinationPath(destRoot + '/' + args.moduleName + '.components.ts');

    this.log(destRoot);
    if (fileSys.existsSync(destRoot)) {        
                
        if (this.options['inline']) {          
           this.fs.copyTpl(this.templatePath(root + '_ng2.component-inline.ts'), this.destinationPath(pageRoot + args.pageName + '.component.ts'), args);
        } else {            
          this.fs.copyTpl(this.templatePath(root + '_ng2.component.ts'), this.destinationPath(pageRoot + args.pageName + '.component.ts'), args);
          this.fs.copyTpl(this.templatePath(root + '_ng2.component.css'), this.destinationPath(pageRoot + args.pageName + '.component.css'), args);
          this.fs.copyTpl(this.templatePath(root + '_ng2.component.html'), this.destinationPath(pageRoot + args.pageName + '.component.html'), args);    
        }
                         
        var content = `\nexport * from './components/${args.pageName}.component';`

        fileSys.appendFile(pagesFile, content, (err) => {
          if (err) {
            this.log(err);
          }
        });
            
    } else {
        this.log("module does not exists");
        //throw;
    }        
  }

});
