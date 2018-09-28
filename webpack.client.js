/**
 * Only needed for front end application
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/client.jsx',
    output: {
        filename: '[name].[chunkhash].bundle.js'
    },
    devServer: {
        host: 'localhost',
        port: 4200,
        historyApiFallback: true,
        proxy: {
            '/query': 'http://localhost:3000/query'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextWebpackPlugin('style.[chunkhash].bundle.css')
    ],
    module: {
        rules: [{
            test: /\.jsx/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.css/,
            exclude: /node_modules/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }]
    }
};
