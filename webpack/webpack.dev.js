var loaders = require("./loaders");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: ['./client/app/main.ts'],
    output: {
        filename: 'build.js',
        path: 'public'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.DefinePlugin({
            PROD_ENV: JSON.stringify(false)
        })
    ],
    module:{
        loaders: loaders
    }
};