//webpack

const path = require('path')
const webpack = require('webpack') // webpack 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离 css 文件，使用这个插件需要单独配置JS和CSS压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩JS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩CSS
const FileManagerPlugin = require('filemanager-webpack-plugin') // webpack copy move delete mkdir archive
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// console.log(path.resolve(__dirname, '~/'));

module.exports = {

    optimization: { // 优化项
        minimizer: [ // 压缩优化
            new UglifyJsPlugin({
                cache: true, // 缓存
                parallel: true, // 并发打包
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },

    mode: 'development', // 两种模式， production (生产模式) development（开发模式）

    entry: {
        index: './app/index.jsx'
    },

    devtool: 'source-map', // 源码映射，生成一个映射文件，帮我们定位源码文件

    output: {
        filename: '[name].js', // 打包后的文件名
        path: path.resolve(__dirname, './dist') // 路径必须是绝对路径
    },

    resolve: {
        modules: [path.resolve('node_modules')],
        alias: {
          '~': path.resolve(__dirname, './app'),
          'images': path.resolve(__dirname, './app/images')
        },
        extensions: ['.js', '.jsx', '.scss', '.css'] // 配置省略后缀名
    },

    module: { // 模块
        // noParse: /jsonc-parser|other-umd-packages/,
        rules: [ // 规则
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                      loader: 'sass-loader',
                      options: {
                        includePaths: ['./node_modules/normalize-scss/sass']
                      }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // 排除
                use: {
                    loader: 'babel-loader',
                    options: { // 用 babel-loader 转化 ES6-ES5
                        presets: [ // 这里是大插件集合
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-flow'
                        ],
                        plugins: [ // 这里可以配置一些小的插件
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/transform-runtime',
                            // umd这种兼容语法在node环境中直接require是不能直接使用的，如果要正常使用，必须要通过转码
                            // babel 会默认对node_modules中引入的文件做相应规范的转码，而别的文件夹不会，除非你手动配置
                            "@babel/plugin-transform-modules-umd"
                        ]
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp|eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50 * 1024,
                        fallback: 'file-loader', //大于limit限制的将转交给指定的loader处理，开启这里后就无需再单独配置file-loader
                        outputPath: './',
                    }
                }
            }
        ]
    },


    plugins: [ // 数组，放着所有 webpack 插件
        new HtmlWebpackPlugin({
            template: './app/index.html',
            filename: 'index.html',
            // minify: {
            //     removeComments: true,
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            hash: true,
            chunks: ['index']
        }),

        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),

        new FileManagerPlugin({
            onEnd: {
                copy: [{
                    source: path.resolve(__dirname, 'app/images/favicon.svg'),
                    destination: path.resolve(__dirname, 'dist/')
                },{
                    source: path.resolve(__dirname, 'server/userList.json'),
                    destination: path.resolve(__dirname, 'dist/')
                }]
            }
        }),

        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),
        }),
        new BundleAnalyzerPlugin()
    ],

    // watch: true,
    // watchOptions: {
    //     poll: 2000, // 每秒问我多少次
    //     aggregateTimeout: 2000, // 防抖
    //     ignored: /node_modules|vendor|build|public|resources/
    // },

    devServer: {
        // host: '0.0.0.0',
        port: 8082,
        progress: true, // 进度条
        contentBase: './dist', // 配置目录
        open: true, // 在DevServer第一次构建完成时，自动用浏览器打开网页
        historyApiFallback: true,
        proxy: {
          '/api': {
              target: 'http://localhost:8081',
              // target: 'http://laravel.xuehtml.com/',
              changeOrigin: true, //changeOrigin 的意思就是把 http 请求中的 Origin 字段进行变换，在浏览器接收到后端回复的时候，浏览器会以为这是本地请求，而在后端那边会以为是在站内的调用。
          }
        },
    }
}
