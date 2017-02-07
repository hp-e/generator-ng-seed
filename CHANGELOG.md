# generator-ng-seed - Changelog

## 0.4.0
### new features
* added a ng-seed config. If not exists a ng-seed.json file will be created. Read more in the config section of readme.md

### changes to page and component generator
* Removed adding a style page by default. Use --scss or -css to add a separate file
* Added --s option for adding style file. This will override any settings in the config file
* Added --t option for adding template file. This will override any settings in the config file

### Module bundlers and loaders
* Added webpack 2 (version 2.2.1)
* Updated all webpack config files to new standard
* Updated awesome-typescript-loader to 3.0.0-beta.18

### misc
* updated angular to 2.4.5
* updated zone.js to 0.7.6
* updated rxjs to 5.1.0
* updated 
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
