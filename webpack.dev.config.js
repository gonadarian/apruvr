const webpack = require('webpack');
const commonConfig = require('./webpack.config');

const config = Object.assign(
    commonConfig,
    {
        mode:       'development',
        devtool:    'source-map',
        output:     Object.assign(
            commonConfig.output,
            {
                sourceMapFilename: 'bundle.js.map',
            }
        ),
        devServer:  {
            contentBase:        './src/',
            historyApiFallback: {
                disableDotRule: true,
            },
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                debug: true,
            }),
        ],
    }
);

module.exports = config;
