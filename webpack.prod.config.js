const webpack = require('webpack');
const devConfig = require('./webpack.config');

const config = Object.assign(
    devConfig,
    {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
            }),
        ],
    }
);

module.exports = config;
