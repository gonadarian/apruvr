const webpack = require('webpack');
const commonConfig = require('./webpack.config');

const config = Object.assign(
    commonConfig,
    {
        mode:   'production',
        output: Object.assign(
            commonConfig.output,
            {
                filename: 'bundle.min.js',
            }
        ),
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                },
            }),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                output:   {
                    comments: false,
                },
                compress: {
                    warnings: false,
                },
            }),
        ],
    }
);

module.exports = config;
