const path        = require('path');
const UglifyJs    = require('uglifyjs-webpack-plugin');
const MiniCss     = require("mini-css-extract-plugin");
const OptimizeCSS = require("optimize-css-assets-webpack-plugin");
const SassLint    = require('sass-lint-webpack');
const dev         = process.env.NODE_ENV === "dev";
const theme       = '../formation/';

let config = {
    entry: {
        app : [
            theme + 'assets/js/app.js',
            theme + 'assets/scss/app.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, theme + 'dist/'),
        filename: '[name].js',
        publicPath: theme
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCss.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|png|jp(e*)g|gif|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new MiniCss({
            filename: '[name].css'
        }),
        new SassLint()
    ],
    watch: true,
    externals: {
      "jquery": "jQuery"
    }
};

if (!dev) {
    config.plugins.push(
        new UglifyJs(),
        new OptimizeCSS()
    )
}

module.exports = config;