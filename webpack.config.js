const HTMLWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');

const path = require('path');

const htmlPlugin = new HTMLWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = (env, options) => {
    console.log(options);
    return {
        entry: { main: './src/index.js' },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: options.mode === 'production' ? '[name].[hash].js' : '[name].js'
        },
        // optimization: {
        //     runtimeChunk: 'single',
        //     splitChunks: {
        //         chunks: 'all',
        //         maxInitialRequests: Infinity,
        //         minSize: 0
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
                    test: /\.css$/,
                    use: [
                        options.mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader'
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
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: true
        }
    };
};
