let helpers = require('./helpers');
let path = require('path');
let webpack = require('webpack');
let webpackMerge = require('webpack-merge'); 
let webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
let commonConfig = require('./webpack.common.js'); 

let CopyWebpackPlugin = require('copy-webpack-plugin');
let CompressionPlugin = require("compression-webpack-plugin");
let WebpackStrip = require('strip-loader');
let AssetsPlugin = require('assets-webpack-plugin');

// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'prod';

module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV }), {

        
        output: {
            filename: 'js/[name].[chunkhash].js',
            sourceMapFilename: 'js/[name].[chunkhash].map',
            chunkFilename: 'js/[id].chunk.[chunkhash].js',
            publicPath: '',
            path: path.join(__dirname, '..', 'dist', ENV),            
        },

        plugins: [
            new AssetsPlugin({ 
                includeManifest: 'manifest' ,
                path: path.join(__dirname, '..', 'dist', ENV)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'prod', 
                DEBUG: false
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    drop_console: true,
                    warnings: false
                },
                comments: false
            }),
            
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|html)$/,
                threshold: 0,
                minRatio: 0.8
            }),
            new CopyWebpackPlugin([
                { from: 'src/assets/images', to: 'assets/images' },
                { from: 'src/index.html' },
                { from: 'src/favicon.ico' },
                { from: 'src/assets/emoticons', to: 'assets/emoticons' },
                { from: 'src/assets/icons', to: 'assets/icons' },
            ])
        ]
    });
}
