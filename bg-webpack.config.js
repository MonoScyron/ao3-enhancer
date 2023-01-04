const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/background/background.ts',
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
        filename: './background/bg_bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};