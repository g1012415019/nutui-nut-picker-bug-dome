const webpack = require('webpack');
const path = require('path');
const config = require('./package.json');
const envConfig = require('./env.js');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const moment = require('moment');
const Carefree = require('@nutui/carefree');
const WebpackUploadPlugin = require('@nutui/upload/webpackUploadPlugin');
const Smock = require('smock-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {

    let webpackConfig = {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, 'build' + '/' + config.version),
            publicPath: config.publicPath + '/' + config.version + '/',
            filename: 'js/[name].js'
        },
        stats: {
            entrypoints: false,
            children: false
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve("src"),
                '@asset': path.resolve("./src/asset"),
                '@component': path.resolve("src/component"),
                '@util': path.resolve("src/util"),
            }
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        argv.mode === 'development' ? 'style-loader' : MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        argv.mode === 'development' ? 'style-loader' : MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"

                    ],

                },
                {
                    test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[ext]',
                            limit: 3000
                        }
                    },

                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                },
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'vue-loader',
                            options: {
                                loaders: {
                                    scss: [
                                        argv.mode === 'development' ? 'vue-style-loader' : MinicssExtractPlugin.loader,
                                        'css-loader',
                                        'sass-loader'
                                    ]
                                },
                                postcss: [autoprefixer()]
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('build'),
            new VueLoaderPlugin(),
            new MinicssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)$/g,
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    safe: true,
                    autoprefixer: false,
                },

            })
        ]
    }

    if (argv.mode === 'production') {

        let vendorVersion = config.vendorVersion;
        let vendorTarget = '/lib/vendor.dll.js';
        if (vendorVersion != '') {
            vendorTarget = '/lib/' + vendorVersion + '/vendor.dll.js';
        }
        webpackConfig.optimization = {
            minimizer: [
                //压缩js
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            // drop_debugger: true, // console
                            // drop_console: true
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })
            ]
        }
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: path.resolve(__dirname, 'build/index.html'),
                chunksSortMode: 'none'
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./static/vendor-manifest.json')
            }),
            new htmlWebpackIncludeAssetsPlugin({
                assets: [vendorTarget],
                publicPath: config.publicPath,
                append: false

            }),
            new CopyWebpackPlugin([
                { from: path.join(__dirname, "./static/vendor.dll.js"), to: path.join(__dirname, "./build" + vendorTarget) }
            ]),
            new webpack.BannerPlugin({
                banner: `${config.name} ${config.version} ${moment().format()}`
            })
        ]);
        if (env && env.upload) {
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new WebpackUploadPlugin({
                    source: 'build',
                    ignoreRegexp: /node_moudles/,
                    sftpOption: {
                        host: envConfig.development.sftpOption.host,
                        port: envConfig.development.sftpOption.port,
                        username: envConfig.development.sftpOption.username,
                        password: envConfig.development.sftpOption.password,
                        // target: `/data/wwwroot/tt_studies/${config.ftpServer}/${config.ftpTarget}`
                        target: envConfig.development.sftpOption.target,
                    }
                })
            ]);
        }

    } else {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunksSortMode: 'none'
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./static/vendordev-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: require.resolve('./static/vendordev.dll.js'),
                includeSourcemap: false

            }),
            new Smock(config.smock)
        ]);
        if (env && env.carefree) {
            // webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            //     new webpack.DefinePlugin({
            //         'process.env.NODE_ENV': JSON.stringify('carefree')
            //     }),
            //     new Carefree({
            //         justUseWifi: false,
            //         publicPath: '//t.woaidongdong.cn/' + config.ftpTarget + '/' + config.version + '/',
            //         sftp: {
            //         }
            //     })
            // ]);
            // webpackConfig.devtool = false;
            // return webpackConfig;
        }
        webpackConfig.output.publicPath = '/';
        webpackConfig.devtool = '#cheap-module-eval-source-map';
        webpackConfig.devServer = {
            contentBase: path.resolve(__dirname, 'build'),
            host: envConfig.development.devServer.host,
            port: envConfig.development.devServer.port,
            compress: true,
            historyApiFallback: true,
            //跨域
            proxy: {
              
            }
        }
    }

    return webpackConfig;

}



