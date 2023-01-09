const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/content_scripts/onload.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                exclude: /src\/background/
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: './content_scripts/cs_bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/css/enhancer.css", to: "css/enhancer.css" }
            ],
        }),
    ],
};