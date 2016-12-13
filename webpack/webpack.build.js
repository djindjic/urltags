var loaders = require("./loaders");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: ['./client/app/main.ts'],
    output: {
        filename: 'build.js',
        path: 'public'
    },
    devtool: 'source-map',
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        ),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.DefinePlugin({
            PROD_ENV: JSON.stringify(true)
        })
    ],
    module:{
        loaders: loaders
    }
};