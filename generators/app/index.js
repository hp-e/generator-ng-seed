'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
//var ejs = require('ejs');
var fileSys = require('fs');
var path = require("path");

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // this.argument('appName', { type: String, required: true });
    // this.argument('port', { type: String, required: false });

    // if (!this.appName) {

    // }

    // if (this.port === undefined || this.port === null) {
    //   this.port = '3000';
    // }

    this.option('q', {
      desc: 'setup only, no libraries, no ui, no automatic download - no questions asked. Just scaffolding',
      type: Boolean,
      default: false
    });

    this.option('lib', {
      desc: 'scaffold the project as an angular library, ready to build and deploy on npm',
      type: Boolean,
      default: false
    });


    this.option('v', {
      type: Boolean,
      default: false
    });

    this.option('no-linting', {
      type: Boolean,
      default: false
    });

    this.option('no-bundler', {
      type: Boolean,
      default: false
    });

    this.option('no-barrel', {
      type: Boolean,
      default: false
    });

    this.option('structure-flat', {
      type: Boolean,
      default: false
    });

    this.option('css', {
      type: Boolean,
      default: false
    });

    // this.option('structure-type', {      
    //   type: Boolean,
    //   default: false
    // });

    // this.option('playground', {      
    //   type: Boolean,
    //   default: false
    // });

    // this.option('testing', {      
    //   type: Boolean,
    //   default: false
    // });

    // this.option('i18i', {      
    //   type: Boolean,
    //   default: false
    // });

    // this.option('aot', {
    //   desc: 'Uses a minimum setup, no libraries, no ui, no automatic download - no questions asked. Just scaffolding',
    //   type: Boolean,
    //   default: false
    // });

    // this.option('options-all', {
    //   desc: 'Uses a minimum setup, no libraries, no ui, no automatic download - no questions asked. Just scaffolding',
    //   type: Boolean,
    //   default: false
    // });

    // this.option('options-default', {
    //   desc: 'Uses a minimum setup, no libraries, no ui, no automatic download - no questions asked. Just scaffolding',
    //   type: Boolean,
    //   default: false
    // });

    // this.option('style-mdl', {
    //   desc: 'Include Material Design Lite (latest stable version)',
    //   type: Boolean,
    //   default: false
    // });


    //defaults

  },

  initializing() {
    let appName = "Angular Application";
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
      defaultStyle: this.options['css'] ? 'css' : 'scss',
      front: 'none',
      ngVersion: 'ng4',
      includeTesting: false,
      includeLinting: !this.options['no-linting'],
      includeInternationalization: false,
      includePlaygroundModule: false,
      includeContent: false,
      itemFolderStructure: this.options['structure-flat'] ? 'flat' : 'type',
      useBarrelFile: !this.options['no-barrel'],
      taskRunner: "none",
      moduleBundler: this.options['no-bundler'] ? 'none' : 'webpack2',
      environment: "none"
    }
  },


  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this ' + chalk.cyan('Angular - Seed') + ' generator!'
    ));

    if (this.options['q']) {
      this.log("Quickstart is selected. We will use default settings - remember to run npm install... Enjoy");
      return;
    } else {

      this.log("We will now ask a bunch of questions ");
      let label = this.options['lib'] ? 'library' : 'application';
      this.log("so that we can scaffold a really nice " + label + " for you");
      this.log("");


      var prompts = [
        { name: 'appName', message: 'What is your application name?', default: this.args.appName },
        { name: 'port', message: 'Please specify the port you want the localhost to use?', default: this.args.port },
        {
          type: 'list',
          name: 'ngVersion',
          message: 'Please select an Angular Version:',
          default: this.args.ngVersion,
          choices: [
            { name: 'Version 4.1.0', value: 'ng4' },
            { name: 'Version 2.4.10', value: 'ng2' }
          ],

        },
        {
          type: 'checkbox',
          name: 'buildEnvironment',
          message: 'Which additional environments would you like to include?',
          choices: [
            { name: 'dev', value: 'dev', checked: false },
            { name: 'prod', value: 'prod', checked: false }
          ]
        },

        //Application Configuration
        // {
        //   type: 'checkbox',
        //   name: 'appConfig',
        //   message: 'Application Configuration:',
        //   choices: [
        //     { name: 'Include Linting (tslint.json)', value: 'tslint', checked: this.args.includeLinting },
        //     //{ name: 'Include Content', value: 'includeContent', checked: this.args.includeContent },
        //     //{ name: 'Playground Module', value: 'playground', checked: this.args.includePlaygroundModule },
        //     // { name: 'Testing with Karma', value: 'karma', checked: this.args.includeTesting },
        //     // { name: 'Internationalization', value: 'i18i', checked: this.args.includeInternationalization },

        //   ]
        // },
        // Libraries
        {
          type: 'checkbox',
          name: 'jslibs',
          message: 'Which JS libraries would you like to include?',
          choices: [
            { name: 'lodash', value: 'lodash', checked: this.args.addLodash },
            { name: 'Font-Awesome', value: 'fontawesome', checked: this.args.addFontAwesome },
            { name: 'Material Design Icons', value: 'mdicons', checked: this.args.addMaterialDesignIcons },
            { name: 'Highcharts', value: 'highchart', checked: this.args.addHighchart },
            { name: 'Moment.js', value: 'momentjs', checked: this.args.addMoment }
          ]
        },

        //Module bundler
        // {
        //   type: 'list',
        //   name: 'taskrunner',
        //   message: 'Please select a task runner?',
        //   default: this.args.taskRunner,
        //   choices: [
        //     { name: 'None', value: 'none' },
        //     { name: 'Gulp', value: 'gulp' },
        //     //{ name: 'Grunt', value: 'grunt' },
        //   ],

        // },

        //Module bundler
        // {
        //   type: 'list',
        //   name: 'bundler',
        //   message: 'Please select a module bundler?',
        //   default: this.args.moduleBundler,
        //   choices: [
        //     { name: 'None', value: 'none' },
        //     //{ name: 'Webpack 1 (latest stable)', value: 'webpack1' },
        //     { name: 'Webpack 2 (2.2.1)', value: 'webpack2' },
        //     // { name: 'SystemJs', value: 'systemjs' },
        //     // { name: 'Rollup', value: 'rollup' },
        //   ],

        // },
        //Styling
        {
          type: 'list',
          name: 'ui',
          message: 'Which UI framework would you like to use?',
          default: this.args.front,
          choices: [
            { name: 'None', value: 'none' },
            { name: 'Material Design Lite (1.3.0)', value: 'mdl' },
            { name: 'Angular Material 2.0.0 (beta.3)', value: 'md2' },
            { name: 'Simple flexbox layout', value: 'flex' },
          ],

        },
        // Environment
        // {
        //   type: 'list',
        //   name: 'env',
        //   message: 'Select the type of running environment to use?',
        //   default: this.args.environment,
        //   choices: [
        //     { name: 'Website only with nodejs (none)', value: 'none' },
        //     { name: 'AspNet Core (static files)', value: 'aspnet-core' },
        //     { name: 'AspNet Core with WebApi', value: 'aspnet-core-api' },
        //     { name: 'Hosting with Docker', value: 'docker' },
        //     { name: 'App with Ionic 2', value: 'ionic2' },
        //     { name: 'Desktop Application With Electron 2', value: 'electron2' },
        //   ],

        // },
      ];

      if (!this.options['q'] && !this.options['skip-install']) {
        var installNpm = {
          type: 'confirm',
          name: 'npmInstall',
          default: false,
          message: 'Would you like us to run npm install?'
        }

        prompts.push(installNpm);
      }


      return this.prompt(prompts).then(function (props) {

        this.options['skip-install'] = !props.npmInstall

        if (!this.options['q']) {
          this.args.appName = props.appName,
            this.args.port = props.port,
            this.args.appNameKebab = _.kebabCase(props.appName),
            this.args.addFontAwesome = _.includes(props.jslibs, 'fontawesome'),
            this.args.addLodash = _.includes(props.jslibs, 'lodash'),
            this.args.addMoment = _.includes(props.jslibs, 'momentjs'),
            this.args.addHighchart = _.includes(props.jslibs, 'highchart'),
            this.args.addMaterialDesignIcons = props.ui === 'md2' ? true : _.includes(props.jslibs, 'mdicons'),
            this.args.front = props.ui,
            this.args.ngVersion = props.ngVersion,
            this.args.includeLinting = !this.options['no-linting'],
            this.args.includeProdEnv = _.includes(props.buildEnvironment, 'prod'),
            this.args.includeDevEnv = _.includes(props.buildEnvironment, 'dev')
        }



      }.bind(this));
    }

  },
  configuring() {
    console.log("configuring ");


  },
  writing() {
    this._writeNgApp();
  },

  install() {
    if (this.options['q']) {
      this.options['skip-install'] = true;
    }

    if (!this.options['skip-install']) {
      this.log("");
      this.log(chalk.cyan("Download dependencies... please wait"));
      this.npmInstall();
    }

  },


  _writeNgApp: function () {
    var root = "ng/";

    this.config.set('ngVersion', this.args.ngVersion);
    this.config.set('appName', this.args.appName);
    this.config.set('frontend', this.args.front);
    this.config.set('port', this.args.port);
    this.config.save();

    //files without advanced configurations


    // files with specific configuration
    // package.json
    this._writePackageFile(root);

    //tsconfig
    this._writeTsConfigFile(root);

    this._writeConfigurationFile();

    this._writeBundlerFile()

    if (this.args.includeLinting) {
      this.copy(root + '_tslint.json', 'tslint.json');
    }

    this.copy(root + 'CHANGELOG.md', 'CHANGELOG.md');

    this.fs.copyTpl(this.templatePath(root + 'README.md'), this.destinationPath('README.md'), this.args);

    this.fs.copyTpl(this.templatePath(root + 'src/vendor.browser.ts'), this.destinationPath('src/vendor.ts'), this.args);
    this.fs.copyTpl(this.templatePath(root + 'src/main.browser.ts'), this.destinationPath('src/main.ts'), this.args);
    this.copy(root + 'src/polyfills.browser.ts', 'src/polyfills.ts');
    //this.copy(root + 'src/main.browser.ts', 'src/main.browser.ts');
    this.copy(root + 'src/custom-typings.d.ts', 'src/custom-typings.d.ts');
    this.copy(root + 'src/favicon.ico', 'src/favicon.ico');
    this.fs.copyTpl(this.templatePath(root + 'src/_index.html'), this.destinationPath('src/index.html'), this.args);

    // src/assets files


    // src/app files
    this.copy(root + 'src/app/App.Settings.ts', 'src/app/app.settings.ts');
    this.copy(root + 'src/app/settings/_interface.ts', 'src/app/settings/app.settings.interface.ts');
    this.copy(root + 'src/app/settings/_app.local.settings.ts', 'src/app/settings/app.local.settings.ts');
    
    if (this.args.includeDevEnv) {
      this.copy(root + 'src/app/settings/_app.dev.settings.ts', 'src/app/settings/app.dev.settings.ts');
    }
    if (this.args.includeProdEnv) {
      this.copy(root + 'src/app/settings/_app.prod.settings.ts', 'src/app/settings/app.prod.settings.ts');
    }


    this.fs.copyTpl(this.templatePath(root + 'src/app/App.routes.ts'), this.destinationPath('src/app/app.routes.ts'), this.args);

    this.fs.copyTpl(this.templatePath(root + 'src/app/App.module.ts'), this.destinationPath('src/app/app.module.ts'), this.args);
    this.copy(root + 'src/app/App.component.ts', 'src/app/app.component.ts');

    this._writeStyleFiles(root);

    // shared
    this.copy(root + 'src/app/shared/_PageNotFound.ts', 'src/app/shared/page-not-found.ts');

    // core
    this.copy(root + 'src/app/core/rxjs-extensions.ts', 'src/app/core/rxjs-extensions.ts');
    // this.copy(root + 'src/app/core/dev-tools/_developer-info.component.html', 'src/app/core/dev-tools/developer-info.component.html');
    // this.copy(root + 'src/app/core/dev-tools/_developer-info.component.ts', 'src/app/core/dev-tools/developer-info.component.ts');
    // this.copy(root + 'src/app/core/dev-tools/_form-info.component.ts', 'src/app/core/dev-tools/form-info.component.ts');
    // this.copy(root + 'src/app/core/dev-tools/_form-info.component.html', 'src/app/core/dev-tools/form-info.component.html');

    // scr/app/home files
    this.copy(root + 'src/app/home/home.component.html', 'src/app/home/home.component.html');
    this.copy(root + 'src/app/home/home.component.ts', 'src/app/home/home.component.ts');
    this.copy(root + 'src/app/home/home.component.css', 'src/app/home/home.component.css');

  },

  _writeConfigurationFile() {
    let defaultConfigPath = path.join(__dirname, '..', 'init', 'templates', '_ng-seed.json');

    let internalConfig = this.fs.readJSON(defaultConfigPath);

    internalConfig.defaultStyle = this.args.defaultStyle;
    internalConfig.itemFolderStructure = this.args.itemFolderStructure;
    internalConfig.uiFramework = this.args.front;
    internalConfig.module.useBarrelFile = this.args.useBarrelFile;

    this.fs.writeJSON('ng-seed.json', internalConfig);
  },

  _writePackageFile(root) {

    //--https --pfx-passphrase localhost --pfx //192.168.169.58/felles/Avento/SSL/localhost/localhost.pfx
    // read json file and add content based on options
    var packageJson = this.fs.readJSON(this.templatePath(root + '_package-default.json'));
    packageJson.name = this.args.appNameKebab;

    let angularVersion = this.args.ngVersion === 'ng2' ? '2.4.10' : '4.1.1';
    let angularRouterVersion = this.args.ngVersion === 'ng2' ? '3.4.10' : angularVersion;

    packageJson.dependencies['@angular/common'] = angularVersion;
    packageJson.dependencies['@angular/compiler'] = angularVersion;
    packageJson.dependencies['@angular/core'] = angularVersion;
    packageJson.dependencies['@angular/forms'] = angularVersion;
    packageJson.dependencies['@angular/http'] = angularVersion;
    packageJson.dependencies['@angular/platform-browser'] = angularVersion;
    packageJson.dependencies['@angular/platform-browser-dynamic'] = angularVersion;
    packageJson.dependencies['@angular/platform-server'] = angularVersion;
    packageJson.dependencies['@angular/router'] = angularRouterVersion;
    //packageJson.dependencies['@angular/upgrade'] = angularVersion;

    if (this.args.ngVersion === 'ng4') {
      packageJson.dependencies['@angular/flex-layout'] = '2.0.0-beta.8';
      packageJson.dependencies['@angular/animations'] = angularVersion;
    }


    packageJson.scripts["server"] = `webpack-dev-server --inline --colors --progress --port ${this.args.port}  --content-base src`;

    if (this.args.includeProdEnv) {
      packageJson.scripts["build:prod"] = "npm run clean:prod && npm run bundle:prod";
      packageJson.scripts["clean:prod"] = "rimraf dist/prod";
      packageJson.scripts["bundle:prod"] = "webpack --env=prod --colors --progress";
      packageJson.scripts["serve:prod"] = "lite-server -c config/server.prod.js";
    }

    if (this.args.includeDevEnv) {
      packageJson.scripts["build:dev"] = "npm run clean:dev && npm run bundle:dev && npm run serve:dev";
      packageJson.scripts["clean:dev"] = "rimraf dist/dev";
      packageJson.scripts["bundle:dev"] = "webpack --env=dev --colors --progress";
      packageJson.scripts["serve:dev"] = "lite-server -c config/server.dev.json";
      packageJson.scripts["explore:dev"] = "source-map-explorer dist/dev/js/main.bundle.js";
    }

    switch (this.args.taskRunner) {
      case "gulp":
        break;
      case "grunt":
        break;
    }

    switch (this.args.front) {
      case "mdl":
        packageJson.devDependencies['@types/material-design-lite'] = '1.1.14';
        packageJson.dependencies['material-design-lite'] = '1.3.0';
        break;
      case "md2":
        packageJson.devDependencies['@types/hammerjs'] = '2.0.34';
        packageJson.dependencies['@angular/material'] = '2.0.0-beta.3';
        packageJson.dependencies['hammerjs'] = '2.0.8';
        break;
    }

    if (this.args.includeTesting) {

    }

    if (this.args.addLodash) {
      packageJson.dependencies['lodash'] = '4.17.4';
      packageJson.devDependencies['@types/lodash'] = '4.14.53';
    }

    if (this.args.addMoment) {
      packageJson.dependencies['moment'] = '2.18.1';
    }

    if (this.args.addHighchart) {
      packageJson.devDependencies['@types/highcharts'] = '4.2.52';
      packageJson.dependencies['angular2-highcharts'] = '0.5.5';
      packageJson.dependencies['highcharts'] = '5.0.10';
    }

    if (this.args.addFontAwesome) {
      packageJson.dependencies['font-awesome'] = '4.7.0';
    }

    if (this.args.addMaterialDesignIcons) {
      packageJson.dependencies['material-design-icons'] = '3.0.1';
    }

    this.fs.writeJSON('package.json', packageJson);
    //this.fs.copyTpl(this.templatePath(root + '_package.json'), this.destinationPath('package.json'), this.args);
  },

  _writeTsConfigFile(root) {
    // read json file and add content based on options
    var configJson = this.fs.readJSON(this.templatePath(root + '_tsconfig.json'));
    var types = configJson.compilerOptions.types;

    if (this.args.addLodash) {
      configJson.compilerOptions.types.push('lodash');
    }

    if (this.args.addMoment) {
      configJson.compilerOptions.types.push('moment');
    }

    if (this.args.addHighchart) {
      configJson.compilerOptions.types.push('highcharts');
    }

    switch (this.args.front) {
      case "mdl":
        configJson.compilerOptions.types.push('material-design-lite');
        break;
      case "md2":
        configJson.compilerOptions.types.push('hammerjs');
        break;
    }

    this.fs.writeJSON('tsconfig.json', configJson);

  },

  _writeBundlerFile() {
    switch (this.args.moduleBundler) {
      case "webpack1":
        this.fs.copyTpl(this.templatePath('webpack/_wp1.rootConfig.js'), this.destinationPath('webpack.config.js'), this.args);
        // config
        this.copy('webpack/config/_wp1.prod.config.js', 'config/prod.config.js');
        break;
      case "webpack2":
        this.fs.copyTpl(this.templatePath('webpack/_wp2.rootConfig.js'), this.destinationPath('webpack.config.js'), this.args);
        // config

        this.copy('webpack/config/_helpers.js', 'config/helpers.js');
        this.copy('webpack/config/_wp.common.js', 'config/webpack.common.js');
        this.copy('webpack/config/_wp2.local.config.js', 'config/webpack.local.js');

        if (this.args.includeProdEnv) {
          this.copy('webpack/config/_server.prod.js', 'config/server.prod.js');
          this.copy('webpack/config/_wp2.prod.config.js', 'config/webpack.prod.js');
        }

        if (this.args.includeDevEnv) {
          this.copy('webpack/config/_server.dev.json', 'config/server.dev.json');
          this.copy('webpack/config/_wp2.dev.config.js', 'config/webpack.dev.js');
        }

        
        break;
    }

  },

  _writeStyleFiles(root) {
    switch (this.args.front) {
      case 'none':
        this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.html'), this.destinationPath('src/app/app.component.html'), this.args);

        this.copy(root + 'src/assets/styles-none.css', 'src/assets/styles.css');
        break;
      case 'mdl':
        this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.mdl.html'), this.destinationPath('src/app/app.component.html'), this.args);

        this.copy(root + 'src/assets/styles-mdl.css', 'src/assets/styles.css');
        break;
      case 'md2':
        this.copy(root + 'src/assets/styles-md2.css', 'src/assets/styles.css');
        this.copy(root + 'src/assets/main-theme.scss', 'src/assets/main-theme.scss');

        this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.md2.html'), this.destinationPath('src/app/app.component.html'), this.args);

        break;
      case 'flex':
        this.copy(root + 'src/assets/styles-flex.css', 'src/assets/styles.css');
        this.fs.copyTpl(this.templatePath(root + 'src/app/app.component.html'), this.destinationPath('src/app/app.component.html'), this.args);
        break;
      default:
        this.fs.copyTpl(this.templatePath(root + 'src/app/app.component-flex.html'), this.destinationPath('src/app/app.component.html'), this.args);

        break;
    }

  },
  _writeMaterialDesignLiteFiles: function (root) {

  },

  _writeAngularMaterialFiles: function (root) {

  },

  _writeTestingFiles: function (root) {

  },

  end() {

    this.log('');
    this.log("Well... That's it. Thank you for using the ng-seed to generate your Angular project");
    this.log('');
    this.log('Be sure to read the ' + chalk.cyan('README.md') + ' for further instruction and');
    this.log('try out the sub generators to speed up the development');
  }
});
