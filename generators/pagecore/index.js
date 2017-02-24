'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var pluralize = require('pluralize');
var fileSys = require('fs');
var path = require("path");

module.exports = yeoman.Base.extend({
constructor: function() {
        yeoman.Base.apply(this, arguments);

        this.argument('path', { type: String, required: true });

        //this.log(this.path);
    },

    initializing: function() {
        console.log("initializing")
    },

    prompting: function() {
        console.log('prompting');
    },

    writing: function() {
        console.log('writing');
    }

}); 
    

    