const webpack = require('webpack');
const { assign } = require('lodash');
const CompressionPlugin = require('compression-webpack-plugin');
const commonConfig = require('./webpack.config');

const config = assign(
    commonConfig,
    {
        mode:   'production',
        output: assign(
            commonConfig.output,
            {
                filename:      '[name].bundle.js',
                chunkFilename: '[name].bundle.js',
            }
        ),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test:   /[\\/]node_modules[\\/]/,
                        name:   'vendor',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                },
            }),
            new CompressionPlugin(),
        ],
    }
);

module.exports = config;
