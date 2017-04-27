let helpers = require('./helpers');
let path = require('path');
let webpack = require('webpack');
let webpackMerge = require('webpack-merge'); // used to merge webpack configs
let commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
let CopyWebpackPlugin = require('copy-webpack-plugin');


// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';


module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV }), {
        // devtool: 'cheap-module-source-map', // cheap-module-eval-source-map or eval-source-map

        output: {
            publicPath: '',
            path: path.join(__dirname, '/../dist/dev'),
            filename: 'js/[name].bundle.js',
            sourceMapFilename: 'js/[name].map',
            chunkFilename: 'js/[id].chunk.js'
        },

        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'dev', 
                DEBUG: false
            }),
            new CopyWebpackPlugin([                
                { from: 'src/index.html' },
                { from: 'src/favicon.ico' },                
            ]),
        ]
    });
}
