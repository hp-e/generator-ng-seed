'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
//var ejs = require('ejs');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.option('q', {
      desc: 'uses bare minimum, no libraries, no ui, no automatic download - no questions asked. Just scaffolding',
      type: Boolean,
      default: false
    });

    // this.option('options-min', {
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

    var appName = "Angular Application"
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
      ngVersion: 'ng2',
      includeTesting: false,
      includeLinting: true,
      includeInternationalization: false,
      includePlaygroundModule: false,
      includeContent: false,
      taskRunner: "none",
      moduleBundler: "webpack1",
      environment: "none"
    }
  },

  init: function () {

  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this ' + chalk.cyan('Angular - Seed') + ' generator!'
    ));

    if (this.options['q']) {
      this.log("Quickstart is selected. We will use default settings - remember to run npm install... Enjoy");
      return;
    } else {

      this.log("We will now ask a bunch of questions ");
      this.log("so that we can scaffold a really nice application for you");
      this.log("");


      var prompts = [
        { name: 'appName', message: 'What is your application name?', default: this.args.appName },
        { name: 'port', message: 'Please specify the port you want the localhost to use?', default: this.args.port },
        //Application Configuration
        {
          type: 'checkbox',
          name: 'appConfig',
          message: 'Application Configuration:',
          choices: [
            { name: 'Include Linting (tslint.json)', value: 'tslint', checked: this.args.includeLinting },
            //{ name: 'Include Content', value: 'includeContent', checked: this.args.includeContent },
            //{ name: 'Playground Module', value: 'playground', checked: this.args.includePlaygroundModule },
            // { name: 'Testing with Karma', value: 'karma', checked: this.args.includeTesting },
            // { name: 'Internationalization', value: 'i18i', checked: this.args.includeInternationalization },

          ]
        },
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
        {
          type: 'list',
          name: 'bundler',
          message: 'Please select a module bundler?',
          default: this.args.moduleBundler,
          choices: [
            { name: 'None', value: 'none' },
            { name: 'Webpack 1 (latest stable)', value: 'webpack1' },
            //{ name: 'Webpack 2 (2.2.0-rc.3)', value: 'webpack2' },
            // { name: 'SystemJs', value: 'systemjs' },
            // { name: 'Rollup', value: 'rollup' },
          ],

        },
        //Styling
        {
          type: 'list',
          name: 'ui',
          message: 'Which UI framework would you like to use?',
          default: this.args.front,
          choices: [
            { name: 'None', value: 'none' },
            { name: 'Material Design Lite (1.2.1)', value: 'mdl' },
            { name: 'Angular Material 2.0.0 (beta.1)', value: 'md2' },
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
        // To access props later use this.props.someAnswer;
        //this.props = props;
        //this.log(props.npmInstall);

        this.options['skip-install'] = !props.npmInstall

        if (!this.options['q']) {
          this.args = {
            port: props.port,
            appName: props.appName,
            appNameKebab: _.kebabCase(props.appName),
            version: "1.0.0",
            description: "",
            addFontAwesome: _.includes(props.jslibs, 'fontawesome'),
            addLodash: _.includes(props.jslibs, 'lodash'),
            addMoment: _.includes(props.jslibs, 'momentjs'),
            addHighchart: _.includes(props.jslibs, 'highchart'),
            addMaterialDesignIcons: props.ui === 'md2' ? true : _.includes(props.jslibs, 'mdicons'),
            front: props.ui,
            ngVersion: 'ng2',
            //includeTesting: _.includes(props.appConfig, 'karma'),
            includeLinting: _.includes(props.appConfig, 'tslint'),
            //includeInternationalization: _.includes(props.appConfig, 'i18i'),
            //includePlaygroundModule: _.includes(props.appConfig, 'playground'),
            //includeContent: _.includes(props.appConfig, 'includeContent'),,
            taskRunner: props.taskrunner,
            moduleBundler: props.bundler,
            environment: props.env
          }
        }



      }.bind(this));
    }

  },

  writing: function () {
    this._writeNg2App();
  },

  install: function () {
    if (this.options['q']) {
      this.options['skip-install'] = true;
    }

    if (!this.options['skip-install']) {
      this.log("");
      this.log(chalk.cyan("Download dependencies... please wait"));
      this.npmInstall();
    }

  },


  _writeNg2App: function () {
    var root = "ng2/";

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

    if (this.args.includeLinting) {
      this.copy(root + '_tslint.json', 'tslint.json');
    }

    if (this.args.moduleBundler === 'webpack1') {
      //if (this.args.moduleBundler === 'none')
      this.fs.copyTpl(this.templatePath(root + '_webpack.config.js'), this.destinationPath('webpack.config.js'), this.args);
      // config
      this.copy(root + 'config/prod.config.js', 'config/prod.config.js');


    }

    this.copy(root + 'README.md', 'README.md');
    this.copy(root + 'CHANGELOG.md', 'CHANGELOG.md');



    this.fs.copyTpl(this.templatePath(root + 'src/vendor.browser.ts'), this.destinationPath('src/vendor.ts'), this.args);
    this.fs.copyTpl(this.templatePath(root + 'src/main.browser.ts'), this.destinationPath('src/main.ts'), this.args);
    this.copy(root + 'src/polyfills.browser.ts', 'src/polyfills.ts');
    //this.copy(root + 'src/main.browser.ts', 'src/main.browser.ts');
    this.copy(root + 'src/custom-typings.d.ts', 'src/custom-typings.d.ts');
    this.copy(root + 'src/favicon.ico', 'src/favicon.ico');
    this.fs.copyTpl(this.templatePath(root + 'src/index.html'), this.destinationPath('src/index.html'), this.args);

    // src/assets files


    // src/app files
    this.copy(root + 'src/app/App.Settings.ts', 'src/app/app.settings.ts');
    this.copy(root + 'src/app/App.routes.ts', 'src/app/app.routes.ts');
    this.fs.copyTpl(this.templatePath(root + 'src/app/App.module.ts'), this.destinationPath('src/app/app.module.ts'), this.args);
    this.copy(root + 'src/app/App.component.ts', 'src/app/app.component.ts');

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

    // shared
    this.copy(root + 'src/app/shared/_PageNotFound.ts', 'src/app/shared/page-not-found.ts');

    // core
    this.copy(root + 'src/app/core/rxjs-extensions.ts', 'src/app/core/rxjs-extensions.ts');

    // scr/app/home files
    this.copy(root + 'src/app/home/home.component.html', 'src/app/home/home.component.html');
    this.copy(root + 'src/app/home/home.component.ts', 'src/app/home/home.component.ts');
    this.copy(root + 'src/app/home/home.component.css', 'src/app/home/home.component.css');

  },

  _writePackageFile: function (root) {
    // read json file and add content based on options
    var packageJson = this.fs.readJSON(this.templatePath(root + '_package-default.json'));
    packageJson.name = this.args.appNameKebab;

    switch (this.args.moduleBundler) {
      case "webpack1":
        packageJson.devDependencies['webpack'] = '^1.14.0';
        packageJson.devDependencies['extract-text-webpack-plugin'] = '^1.0.1';
        packageJson.devDependencies['webpack-dev-server'] = '^1.16.2';
        packageJson.devDependencies['webpack-merge'] = '^1.1.0';

        packageJson.scripts["prod"] = `webpack -p --config config/prod.config.js`;
        break;
      case "webpack2":
        packageJson.devDependencies['webpack'] = '^2.2.0-rc.3';
        packageJson.devDependencies['extract-text-webpack-plugin'] = '^2.0.0-beta.4';
        packageJson.devDependencies['webpack-dev-server'] = '^2.2.0-rc.0';
        packageJson.devDependencies['webpack-merge'] = '^2.0.0';

        packageJson.scripts["prod"] = `webpack --config config/prod.config.js --optimize-minimize`;
        break;
    }

    if (this.args.moduleBundler === 'webpack1' || this.args.moduleBundler === 'webpack2') {
      packageJson.devDependencies["angular2-template-loader"] = "^0.6.0";
      packageJson.devDependencies["url-loader"] = "^0.5.7";
      packageJson.devDependencies["file-loader"] = "0.9.0";
      packageJson.devDependencies["awesome-typescript-loader"] = "^3.0.0-beta.17";
      packageJson.devDependencies["css-loader"] = "^0.26.1";
      packageJson.devDependencies["node-sass"] = "^3.13.0";
      packageJson.devDependencies["raw-loader"] = "^0.5.1";
      packageJson.devDependencies["sass-loader"] = "^4.0.2";
      packageJson.devDependencies["strip-loader"] = "^0.1.2";
      packageJson.devDependencies["style-loader"] = "^0.13.1";
      packageJson.devDependencies["to-string-loader"] = "^1.1.5";

      packageJson.scripts["build"] = "webpack --inline --colors --progress --display-error-details --display-cached";
      packageJson.scripts["watch"] = "npm run build -- --watch";
      packageJson.scripts["server"] = `webpack-dev-server --hot --inline --colors --progress --display-error-details --display-cached --port ${this.args.port}  --content-base src`;
      packageJson.scripts["start"] = "npm run server";

    }
    switch (this.args.taskRunner) {
      case "gulp":
        break;
      case "grunt":
        break;
    }

    switch (this.args.front) {
      case "mdl":
        packageJson.devDependencies['@types/material-design-lite'] = '^1.1.14';
        packageJson.dependencies['material-design-lite'] = '~1.2.1';
        break;
      case "md2":
        packageJson.devDependencies['@types/hammerjs'] = '^2.0.33';
        packageJson.dependencies['@angular/material'] = '^2.0.0-beta.1';
        packageJson.dependencies['hammerjs'] = '^2.0.8';
        break;
    }

    if (this.args.includeTesting) {

    }

    if (this.args.addLodash) {
      packageJson.dependencies['lodash'] = '~4.17.2';
      packageJson.devDependencies['@types/lodash'] = '^4.14.43';
    }

    if (this.args.addMoment) {
      packageJson.devDependencies['@types/moment'] = '^2.13.0';
      packageJson.dependencies['moment'] = '^2.17.1';
      packageJson.dependencies['angular2-moment'] = '^1.0.0';
    }

    if (this.args.addHighchart) {
      packageJson.devDependencies['@types/highcharts'] = '^4.2.44';
      packageJson.dependencies['angular2-highcharts'] = '^0.4.1';
      packageJson.dependencies['highcharts'] = '^5.0.6';
    }

    if (this.args.addFontAwesome) {
      packageJson.dependencies['font-awesome'] = '~4.7.0';
    }

    if (this.args.addMaterialDesignIcons) {
      packageJson.dependencies['material-design-icons'] = '~3.0.1';
    }

    this.fs.writeJSON('package.json', packageJson);
    //this.fs.copyTpl(this.templatePath(root + '_package.json'), this.destinationPath('package.json'), this.args);
  },

  _writeTsConfigFile: function (root) {
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

  _writeMaterialDesignLiteFiles: function (root) {

  },

  _writeAngularMaterialFiles: function (root) {

  },

  _writeTestingFiles: function (root) {

  }
});
