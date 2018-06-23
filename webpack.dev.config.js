const commonConfig = require('./webpack.config');

const config = {
    ...commonConfig,
    mode:    'development',
    devtool: 'source-map',
    output:  {
        ...commonConfig.output,
        sourceMapFilename: 'bundle.js.map',
    },
    devServer: {
        contentBase:        './src/',
        historyApiFallback: {
            disableDotRule: true,
        },
    },
};

module.exports = config;
