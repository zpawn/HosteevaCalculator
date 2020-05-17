const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ];
    }

    return config;
};

const plugins = () => {
    const base = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].bandle.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './favicon.ico' }
            ]
        })
    ];

    if (isProd) {
        // base.push(new BundleAnalyzerPlugin())
    }

    return base;
};

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: './index.js',
        other: './other.js'
    },
    devtool: isDev ? 'source-map' : '',
    output: {
        filename: '[contenthash].[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    context: path.resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@modules': path.resolve(__dirname, './src/modules')
        }
    },
    devServer: {
        port: 3000
    },
    optimization: optimization(),
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                use: ['file-loader'],
            }
        ]
    },
};
