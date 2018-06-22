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
                filename:      '[name].[chunkhash].js',
                chunkFilename: '[name].[chunkhash].js',
            }
        ),
        optimization: {
            splitChunks: {
                chunks:      'all',
                cacheGroups: {
                    lodash: {
                        test: /.*lodash.*/,
                        name: 'lodash',
                    },
                    react: {
                        test: /[\\/](react|redux)/,
                        name: 'react',
                    },
                    firebaseApp: {
                        test:     /firebase-app/,
                        name:     'firebase-app',
                        priority: 10,
                    },
                    firebaseAuth: {
                        test: /firebase-auth/,
                        name: 'firebase-auth',
                    },
                    firebaseDatabase: {
                        test: /firebase-database/,
                        name: 'firebase-database',
                    },
                },
            },
        },
        plugins: [
            new CompressionPlugin(),
        ],
    }
);

module.exports = config;
