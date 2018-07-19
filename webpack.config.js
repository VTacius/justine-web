const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Naming and path settings
var appName = 'justine.js';
var entryPoint = './app/app.js';
var publicPath = '/build';
var exportPath = path.resolve(__dirname, './build');

// Enviroment flag
var plugins = [
    new VueLoaderPlugin()
];

// Main Settings config
module.exports = {
    mode: 'development',
    entry: entryPoint,
    output: {
        path: exportPath,
        filename: appName,
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }  
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        host: '0.0.0.0',
        hot: false,
        inline: false,
    },
    devtool: 'source-map',
};    
    
