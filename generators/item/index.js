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

        // this.option('structure-flat', {
        //     type: Boolean,
        //     default: false
        // });

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


        if (this.options['structure-ask']) {
            let structurePrompt = {
                name: 'userDefinedDirectory',
                message: 'Please provide a name for the sub-directory to place the item in?',
                require: true,

            };

            prompts.push(structurePrompt);
        }


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

        let rootPath = this.internalConfig.rootPath;
        let styleExt = this.options['scss'] ? 'scss' : this.internalConfig.defaultStyle;
        let selectorPrefix = this.internalConfig.component.useSelectorPrefix && this.internalConfig.selectorPrefix ? this.internalConfig.selectorPrefix : "";
        let useBarrel = this.internalConfig.module.useBarrel;
        let barrelPostfix = this.internalConfig.module.barrelFilePostfix;
        let itemFolderStructure = this.options['structure-flat'] ? 'flat' :
            this.options['structure-self'] ? 'self' :
                this.options['structure-ask'] && this.answers.userDefinedDirectory.length > 0 ? 'ask' :
                    this.internalConfig.itemFolderStructure;

        var barrelFilePath = this.destinationPath(rootPath + "/" + this.subpath + '/' + this.moduleName + barrelPostfix + '.ts');
        var modulePath = rootPath + "/" + this.subpath; // + "/" + this.moduleName + '/';

        let itemOptions = {
            useBarrel: true,
            itemFolderStructure: itemFolderStructure,
            rootPath: rootPath,
            selectorPrefix: selectorPrefix,
            barrelFile: barrelFilePath,
            defaultStyle: styleExt,
            modulePath: modulePath,
            styleExt: styleExt
        };

        if (this.options['p'] && this.answers.pageName) {
            //itemsArray.push({ "type": 'page', "names": this.answers.pageName.split(' ') });
            this._writePage(this.subpath, this.moduleName, this.answers.pageName, itemOptions);
        }
        if (this.options['c'] && this.answers.componentName) {
            //itemsArray.push({ "type": 'component', "names": this.answers.componentName.split(' ') });
            this._writeComponent(this.subpath, this.moduleName, this.answers.componentName, itemOptions);
        }
        if (this.options['m'] && this.answers.modelName) {
            //itemsArray.push({ "type": 'model', "names": this.answers.modelName.split(' ') });
            this._writeModel(this.subpath, this.moduleName, this.answers.modelName, itemOptions);
        }
        if (this.options['s'] && this.answers.serviceName) {
            //itemsArray.push({ "type": 'service', "names": this.answers.serviceName.split(' ') });
            this._writeService(this.subpath, this.moduleName, this.answers.serviceName, itemOptions);
        }

        if (this.options['d'] && this.answers.directiveName) {
            //itemsArray.push({ "type": 'service', "names": this.answers.serviceName.split(' ') });
            this._writeDirectives(this.subpath, this.moduleName, this.answers.directiveName, itemOptions);
        }

        if (this.options['pipe'] && this.answers.pipeName) {
            //itemsArray.push({ "type": 'service', "names": this.answers.serviceName.split(' ') });
            this._writePipes(this.subpath, this.moduleName, this.answers.pipeName, itemOptions);
        }

        //this._writeNg2App(this.rootPath, this.moduleName);
    },

    _writePage(rootPath, moduleName, pageNames, itemOptions) {
        let items = pageNames.split(' ');

        let root = 'ng2page/';
        let addStyle = !this.internalConfig.page.addStyleFile ? this.options['css'] || this.options['scss'] : this.internalConfig.page.addStyleFile;
        let addTemplate = !this.internalConfig.page.addTemplateFile ? this.options['tpl'] : this.internalConfig.page.addTemplateFile;
        let classPostfix = this.options['dlg'] ? "Dialog" : this.internalConfig.page.classNamePostfix;
        let filePostfix = this.internalConfig.page.filePostfix;
        let subDir = this.internalConfig.page.subDirectory;


        let isDialog = this.options['dlg'];

        for (var i = 0; i < items.length; i++) {

            var currentItem = items[i];

            let args = this._getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions);

            let styleFileName = args.fileName + '.' + itemOptions.styleExt;
            let templateFileName = args.fileName + '.html';

            let destRoot = args.destinationRoot;


            args.addStyle = addStyle;
            args.addTemplate = addTemplate;
            args.stylePage = styleFileName;
            args.templatePage = templateFileName;
            args.styleExt = itemOptions.styleExt;


            if (addTemplate) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.html'), this.destinationPath(destRoot + templateFileName), args);
            }

            if (addStyle) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.css'), this.destinationPath(destRoot + styleFileName), args);
            }

            if (!isDialog) {
                this.fs.copyTpl(this.templatePath(root + '_ng2.page.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);
            } else {
                this.fs.copyTpl(this.templatePath(root + '_md-dialog.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);
            }

            if (itemOptions.useBarrel) {
                this._addToBarrel(args.subDirectory, args.fileName, itemOptions.barrelFile);
            }

        }
    },

    _getSubDirectory(selectedStyle) {

    },
    _addToBarrel(subDir, fileName, barrelFile) {
        var barrelFilePath = this.destinationPath(barrelFile);
        var content = `\nexport * from './${subDir}/${fileName}';`

        this.writeToExport.push({
            path: barrelFilePath,
            content: content
        });
    },
    _writeComponent(rootPath, moduleName, componentNames, itemOptions) {
        let items = componentNames.split(' ');

        let root = 'ng2component/';
        let addStyle = !this.internalConfig.component.addStyleFile ? this.options['css'] || this.options['scss'] : this.internalConfig.component.addStyleFile;
        let addTemplate = !this.internalConfig.component.addTemplateFile ? this.options['tpl'] : this.internalConfig.component.addTemplateFile;
        let classPostfix = this.internalConfig.component.classNamePostfix;
        let filePostfix = this.internalConfig.component.filePostfix;
        let subDir = this.internalConfig.component.subDirectory;

        for (var i = 0; i < items.length; i++) {

            var currentItem = items[i];

            let args = this._getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions);

            let styleFileName = args.fileName + '.' + itemOptions.styleExt;
            let templateFileName = args.fileName + '.html';

            let destRoot = args.destinationRoot;

            args.addStyle = addStyle;
            args.addTemplate = addTemplate;
            args.stylePage = styleFileName;
            args.templatePage = templateFileName;
            args.styleExt = itemOptions.styleExt;
            args.prefix = itemOptions.selectorPrefix;
            args.selectorName = args.itemKebabCase;
            
            this.fs.copyTpl(this.templatePath(root + '_component.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);

            if (args.addTemplate) {
                this.fs.copyTpl(this.templatePath('_blanc-file.ts'), this.destinationPath(destRoot + templateFileName), args);
            }

            if (args.addStyle) {
                this.fs.copyTpl(this.templatePath('_blanc-file.ts'), this.destinationPath(destRoot + styleFileName), args);
            }

            if (itemOptions.useBarrel) {
                this._addToBarrel(args.subDirectory, args.fileName, itemOptions.barrelFile);
            }

        }
    },

    _writeDirectives(rootPath, moduleName, names, itemOptions) {
        let items = names.split(' ');

        let root = 'ng2directive/';
        let classPostfix = this.internalConfig.directive.classNamePostfix;
        let filePostfix = this.internalConfig.directive.filePostfix;
        let subDir = this.internalConfig.directive.subDirectory;

        for (var i = 0; i < items.length; i++) {

            var currentItem = items[i];

            let args = this._getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions);
            let selectorName = _.camelCase(itemOptions.selectorPrefix + args.className);           
            let destRoot = args.destinationRoot;

            args.selectorName = args.itemKebabCase;            

            this.fs.copyTpl(this.templatePath(root + '_directive.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);

            if (itemOptions.useBarrel) {
                this._addToBarrel(args.subDirectory, args.fileName, itemOptions.barrelFile);
            }

        }

    },

    _writePipes(rootPath, moduleName, names, itemOptions) {
        let items = names.split(' ');

        let root = 'ng2pipe/';
        let classPostfix = this.internalConfig.directive.classNamePostfix;
        let filePostfix = this.internalConfig.directive.filePostfix;
        let subDir = this.internalConfig.directive.subDirectory;

        for (var i = 0; i < items.length; i++) {

            var currentItem = items[i];

             let args = this._getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions);
            let selectorName = _.camelCase(itemOptions.selectorPrefix + args.className);           
            let destRoot = args.destinationRoot;

            args.selectorName = args.itemKebabCase;     

            this.fs.copyTpl(this.templatePath(root + '_pipe.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);

            if (itemOptions.useBarrel) {
                this._addToBarrel(args.subDirectory, args.fileName, itemOptions.barrelFile);
            }

        }
    },

    _writeModel(rootPath, moduleName, modelNames, itemOptions) {

        let items = modelNames.split(' ');

        let root = 'ng2model/';

        let classPostfix = this.internalConfig.model.classNamePostfix;
        let filePostfix = this.internalConfig.model.filePostfix;
        let subDir = this.internalConfig.model.subDirectory;

        for (var i = 0; i < items.length; i++) {

            var currentItem = items[i];

            let args = this._getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions);              
            let destRoot = args.destinationRoot;

            this.fs.copyTpl(this.templatePath(root + '_model.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);

            if (itemOptions.useBarrel) {
                this._addToBarrel(args.subDirectory, args.fileName, itemOptions.barrelFile);
            }
        }
    },

    _writeService(rootPath, moduleName, serviceNames, itemOptions) {
        //console.log("Service", rootPath, moduleName, serviceNames);
        let items = serviceNames.split(' ');

        let root = 'ng2service/';

        let classPostfix = this.internalConfig.service.classNamePostfix;
        let filePostfix = this.internalConfig.service.filePostfix;
        let subDir = this.internalConfig.service.subDirectory;

        for (var i = 0; i < items.length; i++) {

            var currentItem = items[i];

            let args = this._getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions);              
            let destRoot = args.destinationRoot;

            this.fs.copyTpl(this.templatePath(root + '_service.ts'), this.destinationPath(destRoot + args.fileName + '.ts'), args);

            // if (itemOptions.useBarrel) {
            //     this._addToBarrel(subDir, itemFileName, itemOptions.barrelFile);
            // }
        }
    },

    _getCommonArguments(currentItem, filePostfix, classPostfix, subDir, itemOptions) {

        var itemCamelCase = _.camelCase(currentItem);
        var itemKebabCase = _.kebabCase(itemCamelCase);
        var className = itemCamelCase[0].toUpperCase() + itemCamelCase.substr(1);
        var itemFileName = itemKebabCase + filePostfix; // + postfix

        var fullClassName = className + classPostfix;

        switch (itemOptions.itemFolderStructure) {
            case 'settings':
                subDir = subDir;
                break;
            case 'flat':
                subDir = '';
                break;
            case 'self':
                subDir = itemKebabCase;
                break;
            case 'ask':
                subDir = _.kebabCase(this.answers.userDefinedDirectory);
                break;
        }

        let destRoot = itemOptions.modulePath + subDir + '/';

        var args = {
            fileName: itemFileName, //_.kebabCase(page),                
            className: className,
            fullClassName: fullClassName,
            subDirectory: subDir,
            destinationRoot: destRoot,
            itemKebabCase: itemKebabCase
        }
        return args;
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
