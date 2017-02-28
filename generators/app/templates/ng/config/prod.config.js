var WebpackStrip = require('strip-loader');
var devConfig = require('../webpack.config.js');

var stripLoader = {
    test: [/\.js$/,/\.ts$/],
    exclude: /node_modules/,
    loader: WebpackStrip.loader('console.log', 'console.error', 'console.warn')
    
}

devConfig.module.loaders.push(stripLoader);
module.exports = devConfig;