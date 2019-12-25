const path = require('path');

module.exports = {
    name: 'tictaktoe',
    mode: 'development',
    devtool: 'eval',
    resolve : {
        extensions: ['.jsx', '.js'],
    },
    entry: {
        app: ['./client']
    },
    module: {
        rules : [{
            test: /\.jsx?$/,
            loader : 'babel-loader',
            options : {
                presets : [
                    ['@babel/preset-env', {
                        targets : {
                            browsers: ['last 2 chrome version'],
                        },
                        debug : true,
                    }],
                    '@babel/preset-react'
                ],
                "plugins": [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel' 
                ],
            }
        }]
    },
    plugins: [],
    output: {
        path : path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist',
    }
}