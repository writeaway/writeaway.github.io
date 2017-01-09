'use strict';
var path = require('path');
var autoprefixer = require('autoprefixer');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var env = process.env.NODE_ENV;
var webpack = require(path.resolve(node_modules_dir, 'webpack'));
var Visualizer = require('webpack-visualizer-plugin');

var config = {
    output: {
        path: path.join(__dirname),
        library: 'Redaxtor',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new Visualizer({
            filename: './webpack-stat.'+env+'.html'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js)$/, exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    plugins: [
                        'babel-plugin-transform-object-rest-spread'
                    ],
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                exclude: /(node_modules)/,
                loaders: [
                    'style-loader',
                    'css-loader?-url&sourceMap',
                    'postcss-loader',
                    'less?sourceMap'
                ]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?-url',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(woff)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /(node_modules)/,
                loaders: ["url-loader?limit=10000"]
            }
        ]
    },
    resolve: {
        root: path.join(__dirname, "node_modules")
    },
    resolveLoader: {root: path.join(__dirname, "node_modules")},
    devtool: "source-maps",
    postcss: [autoprefixer({browsers: ['last 2 versions']})]
};

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
}

module.exports = config;