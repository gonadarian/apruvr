const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src/app');
const BUILD_DIR = path.resolve(__dirname, 'src/public');

const config = {
    entry:      APP_DIR + '/index.jsx',
    output:     {
        path:               BUILD_DIR,
        filename:           'bundle.js',
        publicPath:         '/public/',
    },
    resolve:    {
        extensions: ['', '.js', '.jsx'],
    },
    module:     {
        loaders: [
            {
                loader:     'babel',
                test:       /\.jsx?/,
                include:    APP_DIR,
            },
            {
                loader:     'style!css',
                test:       /\.css$/,
            },
            {
                loader:     'style!css?modules!less',
                test:       /\.less$/,
            },
        ],
    },
};

module.exports = config;
