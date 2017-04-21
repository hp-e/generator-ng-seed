const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const PathChecker = require('./pathchecker.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'local';


module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV }), {
        // devtool: 'cheap-module-source-map', // cheap-module-eval-source-map or eval-source-map

        output: {
            publicPath: '',
            path: path.resolve(__dirname, './dist'),
            filename: 'js/[name].bundle.js',
            sourceMapFilename: 'js/[name].map',
            chunkFilename: 'js/[id].chunk.js'
        },

        plugins: [
            new PathChecker({ options: { env: ENV } }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'local', // use 'development' unless process.env.NODE_ENV is defined
                DEBUG: true
            }),
        ],

        stats: {
            errorDetails: true,
            errors: true,
            performance: true,
            source: true
        }
    });
}
