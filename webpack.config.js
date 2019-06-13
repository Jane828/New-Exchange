const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const project = require('./project.config.js')

const envDevelopment = project.env === 'development'
const envProduction = project.env === 'production'
const devtool = project.sourceMap ? 'cheap-source-map' : false

const SRC_DIR = path.join(project.basePath, project.srcDir)

const config = {
    entry: {
        main: [SRC_DIR]
    },
    output: {
        path      : path.resolve(project.basePath, project.outDir),
        filename  : envDevelopment ? 'js/[name].js' : "js/[name].[chunkhash:5].js",
        publicPath: project.publicPath
    },
    mode    : project.env,
    devtool : devtool,
    resolve : {
        modules: [
            project.srcDir,
            'node_modules',
        ],
        alias: {
            '@': SRC_DIR
        },
        extensions: ['*', '.js', '.jsx', '.json', '.less', '.css']
    },
    module : {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use : {
                    loader: 'babel-loader?cacheDirectory'
                },
                include: SRC_DIR,
                exclude: /node_modules/
            },
            {
                test    : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader  : 'url-loader',
                options : {
                    limit     : 10000,
                    outputPath: "images"
                }
            }
        ]
    },
    optimization: {
        sideEffects: false,
        splitChunks: {
            chunks     :'all',
            minSize    : 30000,
            minChunks  : 1,
            cacheGroups: {
                common: {
                    name    : 'common',
                    test    : /node_modules/,
                    chunks  : 'initial',
                    priority: -10,
                    enforce : true
                },
                styles: {
                    name   : 'styles',
                    test   : /(\.less|\.css)$/,
                    chunks : 'all',
                    enforce: true,
                }
            }
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context : project.basePath,
            manifest: path.resolve(project.basePath, 'dll', 'manifest.json')
        }),
        new HtmlWebpackPlugin({
            template : 'index.html',
            inject   : true,
            favicon  : path.resolve('favicon.ico'),
            minify   : {
                collapseWhitespace: true,
            }
        }),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        inline: true,
        progress: true,
        port: 9080,
        host: 'localhost',
        proxy: {
        '/api/v1/*': {
            target: 'http://172.38.5.190:9080',
            changeOrigin: true,
            secure: false
            },
        '/captchaReg': {
            target: 'http://172.38.5.190:9080',
            changeOrigin: true,
            secure: false
            }
        }
    },
    // devServer: {
    //     historyApiFallback: true,
    //     contentBase: "./",
    //     quiet: false, //控制台中不输出打包的信息
    //     noInfo: false,
    //     hot: true, //开启热点
    //     inline: true, //开启页面自动刷新
    //     lazy: false, //不启动懒加载
    //     progress: true, //显示打包的进度
    //     watchOptions: {
    //         aggregateTimeout: 300
    //     },
    //     port: '8001', //设置端口号
    //     //其实很简单的，只要配置这个参数就可以了
    //     proxy: {
    //         '/apiv1/*': {
    //             target: 'http://172.38.5.22:8001/apiv1/visitor/login',
    //             secure: false
    //         }
    //     }

    // }
}

const fontLoader = [['woff', 'application/font-woff'], ['woff2', 'application/font-woff2'], ['otf', 'font/opentype'], ['ttf', 'application/octet-stream'], ['eot', 'application/vnd.ms-fontobject'], ['svg', 'image/svg+xml']]
fontLoader.forEach((font) => {
    let extension = font[0]
    let mimetype = font[1]
    config.module.rules.push({
        test    : new RegExp(`\\.${extension}$`),
        loader  : 'url-loader',
        options : {
            name  : 'fonts/[name].[ext]',
            limit : 10000,
            mimetype,
        },
    })
})

if (envDevelopment) {
    config.module.rules.push({
        test: /(\.less|\.css)$/,
        use: [{
            loader : "style-loader"
        }, {
            loader : "css-loader"
        }, {
            loader : "less-loader",
            options: {
                javascriptEnabled: true
            }
        }]
    })
    // config.entry.main.push(
    //     'webpack-hot-middleware/client?path=./__webpack_hmr'
    // )
    config.plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
}

if (envProduction) {
    config.module.rules.push({
        test: /(\.less|\.css)$/,
        use :[
            MiniCssExtractPlugin.loader,
            {
                loader : 'css-loader',
                options: {
                    importLoaders  : 1,
                    minimize: {
                        autoprefixer: {
                            add     : true,
                            remove  : true,
                            browsers: ['last 2 versions'],
                        },
                        discardComments : {
                            removeAll : true,
                        },
                        discardUnused: false,
                        mergeIdents  : false,
                        reduceIdents : false,
                        safe         : true
                    }
                }
            },
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }
        ]
    })
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename     : "css/main.[chunkhash:5].css",
            chunkFilename: 'css/main.[contenthash:5].css'
        }),
        new CopyWebpackPlugin([{
            from : path.join(project.basePath,'dll'),
            to   : path.join(project.basePath,'dist','dll')
        },{
            from : path.join(project.basePath,'pdf'),
            to   : path.join(project.basePath,'dist','pdf')
        },{
            from : path.join(project.basePath,'json/asset.json'),
            to   : path.join(project.basePath,'dist','')
        },{
            from : path.join(project.basePath,'json/whitepaper.pdf'),
            to   : path.join(project.basePath,'dist','')
        },{
            from : path.join(project.basePath,'health.html'),
            to   : path.join(project.basePath,'dist','')
        }])
    )
}

module.exports = config