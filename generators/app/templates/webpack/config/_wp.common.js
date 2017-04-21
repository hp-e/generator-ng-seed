const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function makeWebpackConfig(options) {
    isProd = options.env === 'production' || options.env === 'prod';

    // This is the object where all configuration gets set
    var config = {};

    config.devtool = 'source-map';
    config.cache = true;

    config.entry = {
        'polyfills': './src/polyfills.ts',        
        'main': './src/main.ts',        
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('src'), helpers.root('node_modules')],
    };
        
    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     * 
     */
    config.module = {
        rules: [            
            { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader'] },
            { test: /\.css$/, use: ['to-string-loader', 'style-loader', 'css-loader'] },            
            { test: /\.scss$/, exclude: /node_modules/, use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'] },            
            { test: /\.html$/, use: ['raw-loader'] },
            { test: /\.(png|jpg|gif)$/, exclude: /node_modules/, use: 'url-loader?limit=10000' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" },
        ]
    };


    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),

        new ExtractTextPlugin({ // define where to save the file
            filename: 'styles/[name].bundle.css',
            allChunks: true,
        }),
        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src') // location of your src
        ),

        new HtmlWebpackPlugin({ 
            template: 'src/index.html',
            chunksSortMode: 'dependency', 
        }),

        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    ];


    /** 
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src',
        historyApiFallback: true,
        quiet: false,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        stats: 'errors-only' // none (or false), errors-only, minimal, normal (or true) and verbose

    };

    config.node = {
        global: true,
        crypto: 'empty',
        module: false,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    };


    return config;
};
