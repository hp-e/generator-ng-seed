# generator-ng-seed - Changelog

## 0.2.0

### design options
* Added Angular Material 2 (alpha.11) as a design option
* Added Bootstrap (v.3.3.7) with jQuery (v.3.*) as a design option
* Added a simple flexbox css as a design option
* Changed the 'none' in design option to actually use no design (blank css)
* Added more templated file, based on the design option

### sub generators
* Added a model sub generator

### Other options
* Added highchart (with Angular2-highchart) to library options
* Added momentjs to library options
* Added a new option called playground. this is a 'playground' module where you can test out code, forms etc instead of using production ready modules
    * The playground module will also generate som functional components with lists etc and a functional service

### misc
* Changed the typescript loader to ts-loader (the awesome-ts-loader had some bugs with ts 2.1)
* Added the in memory api and some inital data so that the services can provide data - used in the playground.
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
