const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src/app');
const BUILD_DIR = path.resolve(__dirname, 'src/public');

const config = {
    entry:  `${APP_DIR}/index.jsx`,
    output: {
        path:       BUILD_DIR,
        filename:   'bundle.js',
        publicPath: '/public/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
            test:    /\.jsx?/,
            include: APP_DIR,
            use:     {
                loader: 'babel-loader',
            },
        }, {
            test: /\.css$/,
            use:  [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }],
        }, {
            test: /\.less$/,
            use:  [{
                loader: 'style-loader',
            }, {
                loader:  'css-loader',
                options: {
                    sourceMap:      true,
                    modules:        true,
                    localIdentName: '[local]___[hash:base64:5]',
                },
            }, {
                loader: 'less-loader',
            }],
        }],
    },
};

module.exports = config;
