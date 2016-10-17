const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'src/public');
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
    entry:  APP_DIR + '/index.jsx',
    output: {
        path:       BUILD_DIR,
        filename:   'bundle.min.js',
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
        ],
    },
    module: {
        loaders: [
            {
                test:       /\.jsx?/,
                loader:     'babel',
                include:    APP_DIR,
            },
            {
                test:       /\.css$/,
                loader:     'style!css',
            },
            {
                test:       /\.less$/,
                loader:     'style!css?modules!less',
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
        }),
    ],
};

module.exports = config;
