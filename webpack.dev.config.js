const commonConfig = require('./webpack.config');

const config = Object.assign(
    commonConfig,
    {
        debug:      true,
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
    }
);

module.exports = config;
