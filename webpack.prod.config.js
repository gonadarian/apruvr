const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/public');
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
    entry:  APP_DIR + '/index.jsx',
    output: {
        path:       BUILD_DIR,
        filename:   'bundle.min.js',
    },
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel', include: APP_DIR },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
        }),
    ],
};

module.exports = config;
