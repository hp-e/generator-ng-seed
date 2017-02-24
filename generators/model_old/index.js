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

        this.argument('subpath', { type: String, required: false });
        let sp = this.subpath && this.subpath.length > 0 ? this.subpath : "";

        this.rootPath = "src/app/" + sp + "/";

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
      
      var folders = this._getDirectories(this.destinationPath(this.rootPath));

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
        name: 'modelName',
        message: 'What is the model name?',
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
    

    var subs = this.props.modelName.split(' ');

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
    let root = "ng2/";
    let destRoot = this.destinationPath(this.rootPath + args.moduleName);
    let pageRoot = this.destinationPath(destRoot + '/models/');
    let pagesFile = this.destinationPath(destRoot + '/' + args.moduleName + '.exports.ts');

    this.log(destRoot);
    if (fileSys.existsSync(destRoot)) {        
                
                
          this.fs.copyTpl(this.templatePath(root + '_ng2.model.ts'), this.destinationPath(pageRoot + args.pageName + '.model.ts'), args);
          
        
                
        var pagesFilePath = destRoot + '/' + args.moduleName + '.exports.ts'        
        var content = `\nexport * from "./models/${args.pageName}.model";`

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
