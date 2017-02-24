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

    this.argument('subpath', { type: String, required: false });
    //this.subpath = _.kebabCase(this.className);
    let sp = this.subpath && this.subpath.length > 0 ? this.subpath : "";
    this.rootPath = "src/app/" + sp + "/";

    this.pathItems = sp.split('/')
    
    this.option('m', {
      desc: 'manually specify module',
      type: Boolean,
      default: false
    });

    this.option('inline', {
      desc: 'uses inline template and style',
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
  },

  init: function () {

  },

  _getDirectories: function (p) {
    let folderItems = [];
    var files = fileSys.readdirSync(p).filter(function (file) {
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

    var sp = this.subpath && this.subpath.length > 0 ? this.subpath : "";
    let prompts = [];

    if (this.options['m']) {
      let folders = this._getDirectories(this.destinationPath(this.rootPath));
      let selectFolderPrompt = {
        type: 'list',
        name: 'moduleName',
        message: 'Please select the module to add the pages to',
        require: true,
        choices: folders
      };

      prompts.push(selectFolderPrompt);
    }


    let namePrompt = {
      name: 'pageName',
      message: 'What is the page name(s) (separate more with SPACE)?',
      require: true,
    };

    prompts.push(namePrompt);
    //this.log(folders);
    // var prompts = [
    //   {
    //     type: 'list',
    //     name: 'moduleName',
    //     message: 'Please select the module to add the pages to',
    //     require: true,
    //     choices: folders
    //   },
    //   {
    //     name: 'pageName',
    //     message: 'What is the page name(s) (separate more with SPACE)?',
    //     require: true,
    //   }
    // ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;

      this.props = props;
      if (!this.options['m']) {
        this.props.moduleName = '';
      }
    }.bind(this));


  },

  writing: function () {
    let idx = this.pathItems.length - 1;
    let lastItem = this.pathItems.length > 0 ? this.pathItems[idx] : '';
    this.moduleName = this.props.moduleName ? this.props.moduleName : lastItem;

    this._writeNg2App(this.rootPath, this.moduleName);
  },

  _writeNg2App: function (rootPath, moduleName) {

    var subs = this.props.pageName.split(' ');
    this.writeToExport = [];

    for (var i = 0; i < subs.length; i++) {
      var name = subs[i];

      var page = _.camelCase(name);
      var kebabPageName = _.kebabCase(page);
      var pageName = page[0].toUpperCase() + page.substr(1);

      var styleExt = this.options['scss'] ? 'scss' : 'css';
      var stylePage = kebabPageName + '.page.' + styleExt;

      var args = {
        moduleName: moduleName,
        pageName: kebabPageName, //_.kebabCase(page),
        className: pageName,
        addStyle: this.options['css'] || this.options['scss'],
        stylePage: stylePage
      }

      this._writeNg2SubPage(rootPath, moduleName, args);

    }
  },

  _writeNg2SubPage(rootPath, moduleName, args) {
    var root = "ng2/";
    var destRoot = this.destinationPath(rootPath);
    var pageRoot = this.destinationPath(destRoot + '/pages/');
    let pagesFile = this.destinationPath(destRoot + '/' + moduleName + '.exports.ts');    

    if (this.options['inline']) {
      this.fs.copyTpl(this.templatePath(root + '_ng2.page-inline.ts'), this.destinationPath(pageRoot + args.pageName + '.page.ts'), args);
    } else {
      this.fs.copyTpl(this.templatePath(root + '_ng2.page.ts'), this.destinationPath(pageRoot + args.pageName + '.page.ts'), args);
      this.fs.copyTpl(this.templatePath(root + '_ng2.page.html'), this.destinationPath(pageRoot + args.pageName + '.page.html'), args);

      if (this.options['css']) {
        this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(pageRoot + args.pageName + '.page.css'), args);
      } else if (this.options['scss']) {
        this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(pageRoot + args.pageName + '.page.scss'), args);
      }
    }

    var pagesFilePath = destRoot + '/' + moduleName + '.exports.ts'
    var content = `\nexport * from './pages/${args.pageName}.page';`

    this.writeToExport.push({
      path: pagesFilePath,
      content: content
    });

  },

  end() {
    //write to files...
    if (this.writeToExport.length > 0) {
      this.writeToExport.forEach(item => {
        let fileExists = fileSys.existsSync(item.path)

        if (fileExists) {
          fileSys.appendFile(item.path, item.content, (err) => {
            if (err) {
              this.log(`${item.path}: error => ${err}`);
            }

          });
        }
        // this.log(`${item.path} with content: ${item.content}. File exists? ${fileExists}`)
      })
    }

    /*
if (fileSys.existsSync(pagesFilePath)) {
      fileSys.appendFile(pagesFile, content, (err) => {
        if (err) {
          this.log(`${pagesFilePath}: error => ${err}`);
        }

      });
    }
    */
  }

});
