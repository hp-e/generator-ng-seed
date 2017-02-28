var webpack = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin')
var webpackMerge = require('webpack-merge');

var webpackConfig = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts',
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './dist'),
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    ],

    module: {
        rules: [
            { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader'] },
            { test: /\.css$/, use: ['to-string-loader', 'style-loader', 'css-loader'] },
            { test: /\.scss$/, exclude: /node_modules/, use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.html$/, use: ['raw-loader'] },
      <% if (addFontAwesome) { %>
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ["url-loader?limit=10000&mimetype=application/font-woff"] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ["file-loader"] },
      <% } %>
  ]
    },  
};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',
    cache: true,


    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    // resolve: {
    //   root: [ path.join(__dirname, 'src') ],
    //   extensions: ['', '.ts', '.js']
    // },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: true,
        crypto: 'empty',
        module: false,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};

//var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
