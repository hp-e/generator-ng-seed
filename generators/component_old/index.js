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
    let sp = this.subpath && this.subpath.length > 0 ? this.subpath : "";

    this.rootPath = "src/app/" + sp + "/";

    this.option('inline', {
      desc: 'uses inline template and style (overrides default settings)',
      type: Boolean,
      default: false
    });

    this.option('s', {
      desc: 'adds a layout file for the component (overrides default settings)',
      type: Boolean,
      default: false
    });

    this.option('t', {
      desc: 'adds a template file for the component (overrides default settings)',
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

    let defaultConfigPath = this.destinationPath('ng-seed.json');
    let currentPath = path.join(__dirname, '..', 'init', 'templates', '_ng-seed.json');

    if (!fileSys.existsSync(defaultConfigPath)) {
      defaultConfigPath = currentPath;
      this.composeWith('ng-seed:init');
    }

    let internalConfig = this.fs.readJSON(defaultConfigPath);

    var subs = this.props.pageName.split(' ');

    let styleExt = '.' + internalConfig.styleType;
    let selectorPrefix = internalConfig.component.useSelectorPrefix && internalConfig.selectorPrefix ? internalConfig.selectorPrefix : "";
    let addStyle = !internalConfig.component.addStyleFile ? this.options['s'] : internalConfig.component.addStyleFile;
    let addTemplate = !internalConfig.component.addTemplateFile ? this.options['t'] : internalConfig.component.addTemplateFile;

    for (var i = 0; i < subs.length; i++) {
      var name = subs[i];

      var page = _.camelCase(name);
      var kebabPageName = _.kebabCase(page);
      var pageName = page[0].toUpperCase() + page.substr(1);

      let fileName = kebabPageName + internalConfig.component.filePostfix;

      let stylePage = fileName + styleExt;


      var args = {
        moduleName: this.props.moduleName,
        pageName: kebabPageName, //_.kebabCase(page),
        className: pageName,
        classPostfix: internalConfig.component.classNamePostfix,
        addStyle: addStyle,
        styleExt: styleExt,
        addTemplate: addTemplate,
        stylePage: stylePage,
        fileName: fileName,
        prefix: selectorPrefix
      }

      this._writeNg2SubPage(args);

    }
  },

  _writeNg2SubPage(args) {
        
    var root = "ng2/";
    var destRoot = this.destinationPath(this.rootPath + args.moduleName);
    var pageRoot = this.destinationPath(destRoot + '/components/');
    var pagesFile = this.destinationPath(destRoot + '/' + args.moduleName + '.exports.ts');

    this.log(destRoot);
    if (fileSys.existsSync(destRoot)) {
      let useInline = this.options['inline'] || (!args.addStyle && !args.addTemplate)

      if (this.options['inline']) {
        args.addStyle = false;
        args.addTemplate = false;
      }

      this.fs.copyTpl(this.templatePath(root + '_ng2.component.ts'), this.destinationPath(pageRoot + args.fileName + '.ts'), args);

      if (args.addTemplate) {
        this.fs.copyTpl(this.templatePath(root + '_ng2.component.html'), this.destinationPath(pageRoot + args.fileName + '.html'), args);
      }

      if (args.addStyle) {
        this.fs.copyTpl(this.templatePath(root + '_ng2.component.css'), this.destinationPath(pageRoot + args.fileName + args.styleExt), args);
      }

      var content = `\nexport * from './components/${args.fileName}';`

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
