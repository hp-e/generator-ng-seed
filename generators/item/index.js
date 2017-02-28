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

        this.argument('subpath', { type: String, required: true });
        this.argument('moduleName', { type: String, required: true });

        //console.log("moduleName: " + this.moduleName);
        //this.subpath = _.kebabCase(this.className);
        let sp = this.subpath && this.subpath.length > 0 ? this.subpath : "";
        this.rootPath = "src/app/" + sp + "/";

        this.pathItems = sp.split('/')

        this.option('m', {
            type: Boolean,
            default: false
        });

        this.option('p', {
            type: Boolean,
            default: false
        });

        this.option('c', {
            type: Boolean,
            default: false
        });

        this.option('s', {
            type: Boolean,
            default: false
        });

        this.option('d', {
            type: Boolean,
            default: false
        });

        this.option('tpl', {
            type: Boolean,
            default: false
        });

        this.option('dlg', {
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

    initialize() {
        this.items = [];
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

    prompting() {

        var sp = this.subpath && this.subpath.length > 0 ? this.subpath : "";
        let prompts = [];

        if (this.options['p']) {
            let pagePrompt = {
                name: 'pageName',
                message: 'What is the page name(s) (separate more with SPACE)?',
                require: true,

            };

            prompts.push(pagePrompt);
        }
        if (this.options['c']) {
            let componentPrompt = {
                name: 'componentName',
                message: 'What is the component name(s) (separate more with SPACE)?',
                require: true,

            };

            prompts.push(componentPrompt);
        }
        if (this.options['m']) {
            let modelPrompt = {
                name: 'modelName',
                message: 'What is the model name(s) (separate more with SPACE)?',
                require: true,

            };

            prompts.push(modelPrompt);
        }
        if (this.options['d']) {
            let servicePrompt = {
                name: 'directiveName',
                message: 'What is the directive name(s) (separate more with SPACE)?',
                require: true,

            };

            prompts.push(servicePrompt);
        }

        if (this.options['s']) {
            let servicePrompt = {
                name: 'serviceName',
                message: 'What is the service name(s) (separate more with SPACE)?',
                require: true,

            };

            prompts.push(servicePrompt);
        }

        if (this.options['pipe']) {
            let servicePrompt = {
                name: 'pipeName',
                message: 'Name that pipe (separate more with SPACE)?',
                require: true,

            };

            prompts.push(servicePrompt);
        }


        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.answers = props;
        }.bind(this));


    },
    configuring() {
        // let itemsArray = [];
        // this.simpleArg = "hei";


        // this.items = itemsArray;
        // this.log("answers: " + JSON.stringify(this.answers));
        // this.log("item: " + JSON.stringify(itemsArray));
        let defaultConfigPath = this.destinationPath('ng-seed.json');
        let currentPath = path.join(__dirname, '..', 'init', 'templates', '_ng-seed.json');

        if (!fileSys.existsSync(defaultConfigPath)) {
            defaultConfigPath = currentPath;
            this.composeWith('ng-seed:init');
        }

        this.internalConfig = this.fs.readJSON(defaultConfigPath);



    },
    writing() {

        //console.log(this.internalConfig);
        // let idx = this.pathItems ? this.pathItems.length - 1 : 0;
        // let lastItem = this.pathItems.length > 0 ? this.pathItems[idx] : '';
        // //this.moduleName = this.props.moduleName ? this.props.moduleName : lastItem;       
        this.writeToExport = [];

        if (this.options['p'] && this.answers.pageName) {
            //itemsArray.push({ "type": 'page', "names": this.answers.pageName.split(' ') });
            this._writePage(this.subpath, this.moduleName, this.answers.pageName);
        }
        if (this.options['c'] && this.answers.componentName) {
            //itemsArray.push({ "type": 'component', "names": this.answers.componentName.split(' ') });
            this._writeComponent(this.subpath, this.moduleName, this.answers.componentName);
        }
        if (this.options['m'] && this.answers.modelName) {
            //itemsArray.push({ "type": 'model', "names": this.answers.modelName.split(' ') });
            this._writeModel(this.subpath, this.moduleName, this.answers.modelName);
        }
        if (this.options['s'] && this.answers.serviceName) {
            //itemsArray.push({ "type": 'service', "names": this.answers.serviceName.split(' ') });
            this._writeService(this.subpath, this.moduleName, this.answers.serviceName);
        }

        if (this.options['d'] && this.answers.directiveName) {
            //itemsArray.push({ "type": 'service', "names": this.answers.serviceName.split(' ') });
            this._writeDirectives(this.subpath, this.moduleName, this.answers.directiveName);
        }

        if (this.options['pipe'] && this.answers.pipeName) {
            //itemsArray.push({ "type": 'service', "names": this.answers.serviceName.split(' ') });
            this._writePipes(this.subpath, this.moduleName, this.answers.pipeName);
        }

        //this._writeNg2App(this.rootPath, this.moduleName);
    },

    _writePage(rootPath, moduleName, pageNames) {
        //console.log("page", rootPath, moduleName, pageNames);
        let pages = pageNames.split(' ');
        let styleExt = this.options['scss'] ? 'scss' : this.internalConfig.styleType;;
        let selectorPrefix = this.internalConfig.component.useSelectorPrefix && this.internalConfig.selectorPrefix ? this.internalConfig.selectorPrefix : "";
        let addStyle = !this.internalConfig.page.addStyleFile ? this.options['css'] || this.options['scss'] : this.internalConfig.page.addStyleFile;
        let addTemplate = !this.internalConfig.page.addTemplateFile ? this.options['tpl'] : this.internalConfig.page.addTemplateFile;
        let classPostfix = this.internalConfig.page.classNamePostfix;
        let isDialog = this.options['dlg'];

        for (var i = 0; i < pages.length; i++) {
            var currentPage = pages[i];

            var page = _.camelCase(currentPage);
            var kebabPageName = _.kebabCase(page);
            var pageName = page[0].toUpperCase() + page.substr(1);

            var stylePage = kebabPageName + '.page.' + styleExt;

            var args = {
                moduleName: moduleName,
                pageName: kebabPageName, //_.kebabCase(page),
                className: pageName,
                prefix: selectorPrefix,
                addStyle: addStyle,
                addTemplate: addTemplate,
                stylePage: stylePage,
                classPostfix: classPostfix,
                styleExt: styleExt
            }


            if (!isDialog) {
                this._writeSinglePage(rootPath, kebabPageName, moduleName, args);
            } else {
                this._writeSingleDialog(rootPath, kebabPageName, moduleName, args);
            }

            

        }
    },

    _writeComponent(rootPath, moduleName, componentNames) {
        let components = componentNames.split(' ');

        let styleExt = this.options['scss'] ? 'scss' : this.internalConfig.styleType;;
        let selectorPrefix = this.internalConfig.component.useSelectorPrefix && this.internalConfig.selectorPrefix ? this.internalConfig.selectorPrefix : "";
        let addStyle = !this.internalConfig.component.addStyleFile ? this.options['css'] || this.options['scss'] : this.internalConfig.component.addStyleFile;
        let addTemplate = !this.internalConfig.component.addTemplateFile ? this.options['tpl'] : this.internalConfig.component.addTemplateFile;
        let classPostfix = this.internalConfig.component.classNamePostfix;

        for (var i = 0; i < components.length; i++) {
            var currentComponent = components[i];

            var page = _.camelCase(currentComponent);
            var kebabPageName = _.kebabCase(page);
            var pageName = page[0].toUpperCase() + page.substr(1);


            var stylePage = kebabPageName + '.component.' + styleExt;

            var args = {
                moduleName: moduleName,
                fileName: kebabPageName, //_.kebabCase(page),
                pageName: kebabPageName, //_.kebabCase(page),
                className: pageName,
                prefix: selectorPrefix,
                addStyle: addStyle,
                addTemplate: addTemplate,
                stylePage: stylePage,
                classPostfix: classPostfix,
                styleExt: styleExt
            }

            this._writeSingleComponent(rootPath, kebabPageName, moduleName, args);

        }
    },

    _writeDirectives(rootPath, moduleName, names) {
        let directives = names.split(' ');

        let styleExt = this.options['scss'] ? 'scss' : this.internalConfig.styleType;;
        let selectorPrefix = this.internalConfig.component.useSelectorPrefix && this.internalConfig.selectorPrefix ? this.internalConfig.selectorPrefix : "";
        let addStyle = !this.internalConfig.component.addStyleFile ? this.options['css'] || this.options['scss'] : this.internalConfig.component.addStyleFile;
        let addTemplate = !this.internalConfig.component.addTemplateFile ? this.options['tpl'] : this.internalConfig.component.addTemplateFile;
        let classPostfix = this.internalConfig.component.classNamePostfix;
        let subDirectory = "directives/"; //this.internalConfig.directive ? this.internalConfig.selectorPrefix : "directives";
        let filePostfix = ".directive";

        for (var i = 0; i < directives.length; i++) {
            var current = directives[i];

            var page = _.camelCase(current);
            var kebabPageName = _.kebabCase(page);
            var pageName = page[0].toUpperCase() + page.substr(1);
            let directiveName = _.camelCase(selectorPrefix + current);

            var stylePage = kebabPageName + '.component.' + styleExt;

            var args = {
                moduleName: moduleName,
                fileName: kebabPageName, //_.kebabCase(page),
                pageName: kebabPageName, //_.kebabCase(page),
                className: pageName,
                prefix: selectorPrefix,
                addStyle: addStyle,
                addTemplate: addTemplate,
                stylePage: stylePage,
                classPostfix: classPostfix,
                styleExt: styleExt,
                subDirectory: subDirectory,
                filePostfix: filePostfix,
                itemName: directiveName
            }

            this._writeSingleDirective(rootPath, kebabPageName, moduleName, args);

        }
    },

    _writePipes(rootPath, moduleName, names) {
        let directives = names.split(' ');


        let selectorPrefix = this.internalConfig.pipe.useSelectorPrefix && this.internalConfig.selectorPrefix ? this.internalConfig.selectorPrefix : "";
        let addStyle = false;
        let addTemplate = false;
        let classPostfix = this.internalConfig.pipe.classNamePostfix;
        let subDirectory = "pipes/"; //this.internalConfig.directive ? this.internalConfig.selectorPrefix : "directives";
        let filePostfix = ".pipe";

        for (var i = 0; i < directives.length; i++) {
            var current = directives[i];

            var page = _.camelCase(current);
            var kebabPageName = _.kebabCase(page);
            var pageName = page[0].toUpperCase() + page.substr(1);
            let pipeName = _.camelCase(selectorPrefix + current);

            var args = {
                moduleName: moduleName,
                fileName: kebabPageName, //_.kebabCase(page),
                pageName: kebabPageName, //_.kebabCase(page),
                className: pageName,
                prefix: selectorPrefix,
                addStyle: addStyle,
                addTemplate: addTemplate,
                stylePage: '',
                classPostfix: classPostfix,
                styleExt: '',
                subDirectory: subDirectory,
                filePostfix: filePostfix,
                itemName: pipeName
            }

            this._writeSinglePipe(rootPath, kebabPageName, moduleName, args);

        }
    },

    _writeModel(rootPath, moduleName, modelNames) {

        let models = modelNames.split(' ');
        for (var i = 0; i < models.length; i++) {
            var currentComponent = models[i];

            var page = _.camelCase(currentComponent);
            var kebabPageName = _.kebabCase(page);
            var pageName = page[0].toUpperCase() + page.substr(1);

            var args = {
                moduleName: moduleName,
                pageName: kebabPageName, //_.kebabCase(page),
                className: pageName,
                addStyle: false,
                addTemplate: false,
                stylePage: ''
            }

            this._writeSingleModel(rootPath, kebabPageName, moduleName, args);

        }
    },

    _writeService(rootPath, moduleName, serviceNames) {
        //console.log("Service", rootPath, moduleName, serviceNames);
        let services = serviceNames.split(' ');


        for (var i = 0; i < services.length; i++) {
            var currentService = services[i];

            var page = _.camelCase(currentService);
            var kebabPageName = _.kebabCase(page);
            var pageName = page[0].toUpperCase() + page.substr(1);

            var args = {
                moduleName: moduleName,
                pageName: kebabPageName, //_.kebabCase(page),
                className: pageName,
                addStyle: false,
                addTemplate: false,
                stylePage: ''
            }

            this._writeSingleService(rootPath, kebabPageName, moduleName, args);

        }
    },

    _writeSinglePage(modulePath, pageName, moduleName, args) {
        var root = "ng2page/";
        let pageRoot = this.destinationPath(modulePath + '/pages/');
        let destRoot = "src/app/" + modulePath + 'pages/';

        if (this.options['inline']) {
            this.fs.copyTpl(this.templatePath(root + '_ng2.page-inline.ts'), this.destinationPath(destRoot + pageName + '.page.ts'), args);
        } else {
            this.fs.copyTpl(this.templatePath(root + '_ng2.page.ts'), this.destinationPath(destRoot + pageName + '.page.ts'), args);
            this.fs.copyTpl(this.templatePath(root + '_ng2.page.html'), this.destinationPath(destRoot + pageName + '.page.html'), args);

            if (this.options['css']) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(destRoot + pageName + '.page.css'), args);
            } else if (this.options['scss']) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(destRoot + pageName + '.page.scss'), args);
            }
        }

        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './pages/${pageName}.page';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },

_writeSingleDialog(modulePath, pageName, moduleName, args) {
        var root = "ng2page/";
        let pageRoot = this.destinationPath(modulePath + '/pages/');
        let destRoot = "src/app/" + modulePath + 'pages/';


            this.fs.copyTpl(this.templatePath(root + '_md-dialog.ts'), this.destinationPath(destRoot + pageName + '.dialog.ts'), args);
            this.fs.copyTpl(this.templatePath(root + '_ng2.page.html'), this.destinationPath(destRoot + pageName + '.dialog.html'), args);

            if (this.options['css']) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(destRoot + pageName + '.dialog.css'), args);
            } else if (this.options['scss']) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(destRoot + pageName + '.dialog.scss'), args);
            }
        

        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './pages/${pageName}.dialog';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },

    _writeSingleService(modulePath, serviceName, moduleName, args) {
        var root = "ng2service/";
        let pageRoot = this.destinationPath(modulePath + '/services/');
        let destRoot = "src/app/" + modulePath + 'services/';

        this.fs.copyTpl(this.templatePath(root + '_service.ts'), this.destinationPath(destRoot + serviceName + '.service.ts'), args);

        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './services/${serviceName}.service';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },
    _writeSingleModel(modulePath, modelName, moduleName, args) {
        var root = "ng2model/";
        let pageRoot = this.destinationPath(modulePath + '/models/');
        let destRoot = "src/app/" + modulePath + 'models/';

        this.fs.copyTpl(this.templatePath(root + '_model.ts'), this.destinationPath(destRoot + modelName + '.model.ts'), args);

        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './models/${modelName}.model';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },
    _writeSingleComponent(modulePath, componentName, moduleName, args) {
        var root = "ng2component/";
        let pageRoot = this.destinationPath(modulePath + '/components/');
        let destRoot = "src/app/" + modulePath + 'components/';

        this.fs.copyTpl(this.templatePath(root + '_component.ts'), this.destinationPath(destRoot + componentName + '.component.ts'), args);

        if (args.addTemplate) {
            this.fs.copyTpl(this.templatePath('_blanc-file.ts'), this.destinationPath(destRoot + componentName + '.component.html'), args);
        }

        if (args.addStyle) {
            this.fs.copyTpl(this.templatePath('_blanc-file.ts'), this.destinationPath(destRoot + componentName + '.component.' + args.styleExt), args);
        }


        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './components/${componentName}.component';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },

    _writeSingleDirective(modulePath, itemName, moduleName, args) {
        var root = "ng2directive/";
        let pageRoot = this.destinationPath(modulePath + '/' + args.subDirectory);
        let destRoot = "src/app/" + modulePath + args.subDirectory;

        this.fs.copyTpl(this.templatePath(root + '_directive.ts'), this.destinationPath(destRoot + itemName + args.filePostfix + '.ts'), args);

        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './${args.subDirectory}${itemName}${args.filePostfix}';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },

    _writeSinglePipe(modulePath, itemName, moduleName, args) {
        var root = "ng2pipe/";
        let pageRoot = this.destinationPath(modulePath + '/' + args.subDirectory);
        let destRoot = "src/app/" + modulePath + args.subDirectory;

        this.fs.copyTpl(this.templatePath(root + '_pipe.ts'), this.destinationPath(destRoot + itemName + args.filePostfix + '.ts'), args);

        var pagesFilePath = this.destinationPath("src/app/" + modulePath + '/' + moduleName + '.exports.ts')
        var content = `\nexport * from './${args.subDirectory}${itemName}${args.filePostfix}';`

        this.writeToExport.push({
            path: pagesFilePath,
            content: content
        });

    },
    end() {
        //write to files...    

        if (this.writeToExport && this.writeToExport.length > 0) {
            this.writeToExport.forEach(item => {
                let fileExists = fileSys.existsSync(item.path)


                fileSys.appendFile(item.path, item.content, (err) => {
                    if (err) {
                        this.log(`${item.path}: error => ${err}`);
                    }

                });

            })
        }

    }

});
