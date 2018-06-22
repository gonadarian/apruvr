const webpack = require('webpack');
const { assign } = require('lodash');
const commonConfig = require('./webpack.config');

const config = assign(
    commonConfig,
    {
        mode:    'development',
        devtool: 'source-map',
        output:  assign(
            commonConfig.output,
            {
                sourceMapFilename: 'bundle.js.map',
            }
        ),
        devServer: {
            contentBase:        './src/',
            historyApiFallback: {
                disableDotRule: true,
            },
        },
    }
);

module.exports = config;
