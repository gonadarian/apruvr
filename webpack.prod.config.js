const webpack = require('webpack');
const commonConfig = require('./webpack.config');

const config = Object.assign(
    commonConfig,
    {
        mode:   'production',
        output: Object.assign(
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
        ],
    }
);

module.exports = config;
