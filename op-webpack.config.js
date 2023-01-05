const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/options/options.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                exclude: /src\/background/,
                exclude: /src\/content_scripts/
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.html'],
    },
    output: {
        filename: './options/options.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/options/options.css", to: "options/options.css" },
                { from: "src/options/options.html", to: "options/options.html" },
                { from: "src/icons", to: "icons" }
            ],
        }),
    ],
};