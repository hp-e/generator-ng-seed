'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  init: function () {

  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this fantastic ' + chalk.red('avento-code') + ' generator!'
    ));

    var prompts = [
      //   {
      //   type: 'list',
      //   name: 'type',
      //   message: 'What type of application do you want to create?',
      //   default: 'ng2',
      //   choices: [
      //     {
      //       name: 'Angular2 raw (no core)',
      //       value: 'ng2'
      //     }, {
      //       name: 'Angular2 and Core WebApi',
      //       value: 'webapi_ng2'
      //     }, {
      //       name: 'Angular2 with ASP.Net Core ',
      //       value: 'ng2_core'
      //     }
      //   ]
      // },
      // {
      //   type: 'list',
      //   name: 'ui',
      //   message: 'Which UI framework would you like to use?',
      //   default: 'none',
      //   choices: [
      //      {
      //       name: 'None',
      //       value: 'none'
      //     },{
      //       name: 'Bootstrap (3.3.6)',
      //       value: 'bootstrap'
      //     },
      //     {
      //       name: 'Semantic UI (2.1.8)',
      //       value: 'semantic'
      //     }
      //   ],
      //   // when: function (answers) {
      //   //   return answers.type === 'ng2';
      //   // }

      // },
      {
        name: 'appName',
        message: 'What is your application name?',
        default: "Avento Angular2 App"
      },
      {
        name: 'description',
        message: 'Please give a short description of the app?',
        default: ""
      },
      {
        name: 'port',
        message: 'Please specify the port you want the localhost to use?',
        default: "3000"
      },
      {
        type: 'confirm',
        name: 'downloadModules',
        message: 'Do you want to download node modules now?',
        default: false
      }
    ];

    // return this.prompt(prompts, function (props) {
    //   this.type = props.type;
    //   this.ui = props.ui;
    //   this.appName = props.appName;
    //   //done();
    // }.bind(this));
    //}

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this._writeNg2App();

    // console.log("writing: ", this.props.type)
    // switch (this.props.type) {

    //   case 'ng2':
    //     this._writeNg2App();
    //     break;
    // }

  },

  install: function () {
    if (this.props.downloadModules) {
      this.installDependencies();
    }

  },

  _writeNg2App: function () {
    var root = "ng2raw/";
    var args = {
      developer: "Hans-Petter Eitvet",
      port: this.props.port,
      appName: this.props.appName,
      version: "1.0.0",
      description: this.props.description
    }

    // root files
    this.fs.copyTpl(this.templatePath(root + '_package.json'), this.destinationPath('package.json'), args);
    this.fs.copy(this.templatePath(root + 'tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.copy(root + 'webpack.config.js', 'webpack.config.js');
    this.copy(root + 'README.md', 'README.md');

    // src files
    this.copy(root + 'src/vendor.browser.ts', 'src/vendor.browser.ts');
    this.copy(root + 'src/polyfills.browser.ts', 'src/polyfills.browser.ts');
    this.copy(root + 'src/main.browser.ts', 'src/main.browser.ts');
    this.copy(root + 'src/custom-typings.d.ts', 'src/custom-typings.d.ts');
    this.copy(root + 'src/favicon.ico', 'src/favicon.ico');
    this.fs.copyTpl(this.templatePath(root + 'src/index.html'), this.destinationPath('src/index.html'), args);

    // src/assets files
    this.copy(root + 'src/assets/styles.css', 'src/assets/styles.css');

    // src/app files
    this.copy(root + 'src/app/app.settings.ts', 'src/app/app.settings.ts');
    this.copy(root + 'src/app/app.routes.ts', 'src/app/app.routes.ts');
    this.copy(root + 'src/app/app.module.ts', 'src/app/app.module.ts');
    this.copy(root + 'src/app/app.component.ts', 'src/app/app.component.ts');
    this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.html'), this.destinationPath('src/app/app.component.html'), args);

    // scr/app/home files
    this.copy(root + 'src/app/home/home.component.html', 'src/app/home/home.component.html');
    this.copy(root + 'src/app/home/home.component.ts', 'src/app/home/home.component.ts');
    this.copy(root + 'src/app/home/home.component.css', 'src/app/home/home.component.css');

  }
});
