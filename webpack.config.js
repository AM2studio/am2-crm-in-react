const HTMLWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const Autoprefixer = require('autoprefixer');
const path = require('path');

const htmlPlugin = new HTMLWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = (env, options) => ({
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: options.mode === 'production' ? '[name].[hash].js' : '[name].js'
    },
    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             default: false,
    //             vendors: false,
    //             // vendor chunk
    //             vendor: {
    //                 // sync + async chunks
    //                 chunks: 'all',
    //                 // import file path containing node_modules
    //                 test: /node_modules/
    //             },
    //             common: {
    //                 name: 'common',
    //                 minChunks: 2,
    //                 chunks: 'async',
    //                 priority: 10,
    //                 reuseExistingChunk: true,
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 2, sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: { plugins: () => [Autoprefixer], sourceMap: true }
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css'
        }),
        new AsyncChunkNames(),
        htmlPlugin,
        new WebpackMd5Hash()
    ],
    devtool: options.mode === 'production' ? false : 'cheap-module-eval-source-map',
    devServer:
        options.mode === 'production'
            ? {}
            : {
                  historyApiFallback: true
              }
});
