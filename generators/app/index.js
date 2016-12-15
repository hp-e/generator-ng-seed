'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
//var ejs = require('ejs');

module.exports = yeoman.Base.extend({
  constructor: function(){
        yeoman.Base.apply(this, arguments);
        this.option('easy-peasy', {
           desc: 'uses bare minimum, no libraries, no ui, no automatic download - no questions asked. Just scaffolding',
           type: Boolean,
           default: false 
        });

        var appName = "Angular2 Application"
        //defaults
        this.args = {          
          port: 3000,
          appName: appName,
          appNameKebab: _.kebabCase(appName),
          version: "1.0.0",
          description: "",
          addFontAwesome: false,
          addLodash: false,
          addMoment: false,
          addHighchart: false,
          addMaterialDesignIcons: false,
          front: 'none',
          ngVersion: 'ng2'
        }
    },
  
  init: function () {

  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this fantastic ' + chalk.cyan('Angular - Seed') + ' generator!'
    ));

    if (this.options['easy-peasy']) {
      this.log("Easy Peasy is selected. We will use default settings - remember to run npm install... Enjoy");
      return;
    } else 
    {
      this.log("We will now ask a bunch of questions so that we can scaffold a really nice application for you");
      this.log("")
      
      var prompts = [
        { name: 'appName', message: 'What is your application name?', default: this.args.appName },
        { name: 'port', message: 'Please specify the port you want the localhost to use?', default: this.args.port  },
        {
          type: 'checkbox',
          name: 'jslibs',
          message: 'Which JS libraries would you like to include?',
          choices: [
            { name: 'lodash', value: 'lodash', checked: true },
            { name: 'Font-Awesome', value: 'fontawesome', checked: true },
            //{ name: 'Material Design Icons', value: 'mdicons', checked: false },
            //{ name: 'Highcharts', value: 'highchart', checked: false },
            //{ name: 'Moment.js', value: 'momentjs', checked: false }
          ]
        },

        {
          type: 'list',
          name: 'ui',
          message: 'Which UI framework would you like to use?',
          default: 'none',
          choices: [
            { name: 'None', value: 'none' },            
            { name: 'Material Design Lite (1.2.1)', value: 'mdl'  }
          ],        

        },     
      ];


      return this.prompt(prompts).then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
        
        
      }.bind(this));
    }
    
  },

  writing: function () {    
    this._writeNg2App();
  },

  install: function () {
    if (this.options['easy-peasy']) {
      this.options['skip-install'] = true;
    }

    if (!this.options['skip-install']) {
      this.log("Download dependencies: ")
      this.npmInstall();      
    }

  },


  _writeNg2App: function () {
    var root = "ng2raw/";
    
    if (!this.options['easy-peasy'] && this.props) {
        this.args = {
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
          front: this.props.ui,
          ngVersion: 'ng2'
        }
    }
    
    this.config.set('ngVersion', this.args.ngVersion);
    this.config.set('appName', this.args.appName);
    this.config.set('frontend', this.args.front);
    this.config.set('port', this.args.port);
    this.config.save();
    

    
    this.fs.copyTpl(this.templatePath(root + '_package.json'), this.destinationPath('package.json'), this.args);
    this.fs.copy(this.templatePath(root + 'tsconfig.json'), this.destinationPath('tsconfig.json'));
    //this.fs.copy(this.templatePath(root + '.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(this.templatePath(root + 'webpack.config.js'), this.destinationPath('webpack.config.js'), this.args);
    
    this.copy(root + 'README.md', 'README.md');
    this.copy(root + 'CHANGELOG.md', 'CHANGELOG.md');

    // config
    this.copy(root + 'config/prod.config.js', 'config/prod.config.js');


    this.fs.copyTpl(this.templatePath(root + 'src/vendor.browser.ts'), this.destinationPath('src/vendor.browser.ts'), this.args);
    this.copy(root + 'src/polyfills.browser.ts', 'src/polyfills.browser.ts');
    this.copy(root + 'src/main.browser.ts', 'src/main.browser.ts');
    this.copy(root + 'src/custom-typings.d.ts', 'src/custom-typings.d.ts');
    this.copy(root + 'src/favicon.ico', 'src/favicon.ico');
    this.fs.copyTpl(this.templatePath(root + 'src/index.html'), this.destinationPath('src/index.html'), this.args);

    // src/assets files
    this.copy(root + 'src/assets/styles.css', 'src/assets/styles.css');

    // src/app files
    this.copy(root + 'src/app/App.Settings.ts', 'src/app/app.settings.ts');
    this.copy(root + 'src/app/App.routes.ts', 'src/app/app.routes.ts');
    this.fs.copyTpl(this.templatePath(root + 'src/app/App.module.ts'), this.destinationPath('src/app/app.module.ts'), this.args);
    this.copy(root + 'src/app/App.component.ts', 'src/app/app.component.ts');
    
    switch (this.args.front) {
      case 'mdl':
          this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.mdl.html'), 
            this.destinationPath('src/app/app.component.html'), this.args);
        break;
      default:
        this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.html'), 
          this.destinationPath('src/app/app.component.html'), this.args);

        break;
    }
    
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
