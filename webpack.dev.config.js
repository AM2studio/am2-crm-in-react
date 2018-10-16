const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true
    }
});
