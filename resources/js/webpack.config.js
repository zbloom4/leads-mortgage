var path = require('path');
var webpack = require('webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [__dirname + '/app.js'],
    output: { path: __dirname + "../../../public/js/dist", filename: 'app.bundle.js' },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                },
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "../../images/",
                            emitFile: true
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff?.)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "../../fonts/",
                            emitFile: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ],
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            logo: path.resolve("./img/favicon.png"),
            suppressSuccess: false,
            sound: false
        }),
    ],
    devtool: '#eval-source-map',
    mode: "development"
};
