const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/background/background.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "src/css/enhancer.css", to: "css/enhancer.css"},
                {from: "src/options/options.css", to: "options/options.css"},
                {from: "src/options/options.html", to: "options/options.html"},
                {from: "src/icons", to: "icons"}
            ],
        }),
    ],
};