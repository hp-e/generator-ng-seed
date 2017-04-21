# generator-ng-seed - Changelog

## 1.1.0
### new features
* Build for different environment
* Use lite-server to test various builds

### changes sub generators
* Add environment scripts and settings files ```yo ng-seed:env <name>```

### Module bundlers and loaders
* Updated webpack 2 (version 2.2.1)
* Updated awesome-typescript-loader to 3.1.2

### misc
* updated angular 4rc1 to release 4.0.1 as the default option (select in start wizard)
* updated angular to 2.4.10
* updated zone.js to 0.7.7
* updated rxjs to 5.3.0
* bug fixes

## 1.0.0
### new features
* added a ng-seed config. If not exists a ng-seed.json file will be created. Read more in the config section of readme.md
* Added angular 4 RC1 as an option (select in start wizard)
* Added a directive and pipe sub generator
* Webpack 2 (2.2.1) is used as default

### changes sub generators
* Removed adding a style page by default. Use --scss or -css to add a separate file
* Added new options for adding items with a module (see the readme.md for more info)

### Module bundlers and loaders
* Added webpack 2 (version 2.2.1)
* Updated all webpack config files to new standard
* Updated awesome-typescript-loader to 3.0.8

### misc
* updated angular to 2.4.8
* updated zone.js to 0.7.7
* updated rxjs to 5.2.0
* bug fixes


## 0.3.0

### changes to module sub generator
* Name og module must be given as argument and the user will no longer be asked for name.

## 0.2.0

### design options
* Added Angular Material 2 (beta.1) as a design option
* Added a simple flexbox css as a design option
* Changed the 'none' in design option to actually use no design (blank css)

### sub generators
* Added a model sub generator

### Other options
* Added highchart (with Angular2-highchart) to library options
* Added momentjs to library options

### misc
* Changed code to reflect common settings in tslint (" instead of ' an so on)
* bug fixes

## 0.1.5 

* bug fixes of a bug-fix

## 0.1.4

* bug fixes


## 0.1.3

* added the --easy-peasy option for quickly scaffolding an app
* better explanation in the readme.md
* bug fixes

## 0.1.2

* added page generator
* added component generator
* bug fixes
