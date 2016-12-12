'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var ejs = require('ejs');

module.exports = yeoman.Base.extend({
  constructor: function(){
        yeoman.Base.apply(this, arguments);
        // this.appnameInit = "Angular2 App";
        // this.argument('appnameInit', { type: String, required: false });
        // this.appnameInit = _.kebabCase(this.appnameInit);
        
        // this.option('libs', {
        //    desc: 'Optionally includes all jslibs from jslibs list.',
        //    type: Boolean,
        //    default: false 
        // });

        // this.option('i', {
        //    desc: 'Optionally download and install all packages. If omitted, npm install is required.',
        //    type: Boolean,
        //    default: false 
        // });
    },
  
  init: function () {

  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this fantastic ' + chalk.red('Angular - Seed') + ' generator!'
    ));

    this.log("We will now ask a bunch of questions so that we can scaffold a really nice application for you");
    this.log("")
    var prompts = [
      {
        name: 'appName',
        message: 'What is your application name?',
        default: "Angular2 App"
      },
      {
        name: 'port',
        message: 'Please specify the port you want the localhost to use?',
        default: "3000"
      },
      {
        type: 'checkbox',
        name: 'jslibs',
        message: 'Which JS libraries would you like to include?',
        choices: [
          {
            name: 'lodash',
            value: 'lodash',
            checked: false
          },
          {
            name: 'Font-Awesome',
            value: 'fontawesome',
            checked: false
          },
          {
            name: 'Material Design Icons',
            value: 'mdicons',
            checked: false
          },
          {
            name: 'Highcharts',
            value: 'highchart',
            checked: false
          },
          {
            name: 'Moment.js',
            value: 'momentjs',
            checked: false
          }
        ]
      },

      {
        type: 'list',
        name: 'ui',
        message: 'Which UI framework would you like to use?',
        default: 'none',
        choices: [
          {
            name: 'None',
            value: 'none'
          },
          {
            name: 'Angular Material (Alpha 11)',
            value: 'md2'
          },
          {
            name: 'Angular Material Lite (1.2.1)',
            value: 'mdl'
          },
          {
            name: 'Bootstrap (3.3.6)',
            value: 'bs3'
          }
        ],
        // when: function (answers) {
        //   return answers.type === 'ng2';
        // }

      },
      
      // {
      //   type: 'confirm',
      //   name: 'downloadModules',
      //   message: 'Do you want to download node modules now?',
      //   default: false
      // }
    ];


    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.config.set('ngVersion', "ng2");
      this.config.save();
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
    
    if (!this.options['skip-install']) {
      this.log("Download dependencies: ")
      this.installDependencies();      
    }

  },


  _writeNg2App: function () {
    var root = "ng2raw/";
    var args = {
      developer: "Hans-Petter Eitvet",
      port: this.props.port,
      appName: this.props.appName,
      appNameKebab: _.kebabCase(this.props.appName),
      version: "1.0.0",
      description: "",
      addFontAwesome: _.includes(this.props.jslibs, 'fontawesome'),
      addLodash: _.includes(this.props.jslibs, 'lodash'),
      addMoment: _.includes(this.props.jslibs, 'momentjs'),
      addHighchart: _.includes(this.props.jslibs, 'highchart'),
      addMaterialDesignIcons: _.includes(this.props.jslibs, 'mdicons'),
      front: this.props.ui
    }

    //this.log(args);

    
    this.fs.copyTpl(this.templatePath(root + '_package.json'), this.destinationPath('package.json'), args);
    this.fs.copy(this.templatePath(root + 'tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.copy(root + 'webpack.config.js', 'webpack.config.js');
    this.copy(root + 'README.md', 'README.md');

    // config
    this.copy(root + 'config/prod.config.js', 'config/prod.config.js');


    this.fs.copyTpl(this.templatePath(root + 'src/vendor.browser.ts'), this.destinationPath('src/vendor.browser.ts'), args);
    this.copy(root + 'src/polyfills.browser.ts', 'src/polyfills.browser.ts');
    this.copy(root + 'src/main.browser.ts', 'src/main.browser.ts');
    this.copy(root + 'src/custom-typings.d.ts', 'src/custom-typings.d.ts');
    this.copy(root + 'src/favicon.ico', 'src/favicon.ico');
    this.fs.copyTpl(this.templatePath(root + 'src/index.html'), this.destinationPath('src/index.html'), args);

    // src/assets files
    this.copy(root + 'src/assets/styles.css', 'src/assets/styles.css');

    // src/app files
    this.copy(root + 'src/app/App.Settings.ts', 'src/app/app.settings.ts');
    this.copy(root + 'src/app/App.routes.ts', 'src/app/app.routes.ts');
    this.fs.copyTpl(this.templatePath(root + 'src/app/App.module.ts'), this.destinationPath('src/app/app.module.ts'), args);
    this.copy(root + 'src/app/App.component.ts', 'src/app/app.component.ts');
    this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.html'), this.destinationPath('src/app/app.component.html'), args);

    // shared
    this.copy(root + 'src/app/shared/_PageNotFound.ts', 'src/app/shared/page-not-found.ts');

    // core
    this.copy(root + 'src/app/core/rxjs-extensions.ts', 'src/app/core/rxjs-extensions.ts');

    // scr/app/home files
    this.copy(root + 'src/app/home/home.component.html', 'src/app/home/home.component.html');
    this.copy(root + 'src/app/home/home.component.ts', 'src/app/home/home.component.ts');
    this.copy(root + 'src/app/home/home.component.css', 'src/app/home/home.component.css');

  }
});
