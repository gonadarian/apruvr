const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = require('./webpack.config');

const config = {
    ...commonConfig,
    mode:   'production',
    output: {
        ...commonConfig.output,
        filename:      '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
    },
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
        ...commonConfig.plugins,
        new CleanWebpackPlugin(['src/public']),
    ],
};

module.exports = config;
