const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist'
    }
});
