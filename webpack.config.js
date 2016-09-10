const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/public');
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
    entry:  APP_DIR + '/index.jsx',
    output: {
        path:       BUILD_DIR,
        filename:   'bundle.js',
    },
    module: {
        loaders: [
            {
                test:       /\.jsx?/,
                loader:     'babel',
                include:    APP_DIR,
            },
            {
                test:       /\.css$/,
                loader:     'style-loader!css-loader',
            },
        ],
    },
};

module.exports = config;
