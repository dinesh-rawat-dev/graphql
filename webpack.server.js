/**
 * Required only for server-side express
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server.js',
    target: 'node',
    output: {
        filename: 'server.js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/app/data/products.json',
            to: 'data/products.json'
        }])
    ],
    externals: [
        nodeExternals(),
        function (context, request, callback) {
            if (/(products.json)$/.test(request)) {
                return callback(null, 'commonjs ' + request);
            }
            callback()
        },
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};