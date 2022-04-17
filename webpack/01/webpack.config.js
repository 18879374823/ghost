const path = require('path');
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugun = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.js', // 打包的入口
    output: {
        filename: 'bundle.js',// 出口文件名
        path: path.resolve(__dirname, 'dist'), // 文件的输出路径，path需要设置成绝对路径
        clean: true, // 清理dist，讲上次打包生成的多余的文件清理掉
        assetModuleFilename: 'images/[contenthash][ext]', // 设置打包后的资源路径
    },
    // 编译模式：development（开发）/production（生产）/none
    mode: 'development',
    // 配置后，从浏览器中定位错误代码是源文件的位置，而不是编译后文件的位置
    devtool: 'inline-source-map',
    // 配置插件的地方
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 模版
            filename: 'app.html', // 编译后文件名
            inject: 'body', // 可以设置引入的script标签的位置，这样设置，生成的位置就在body标签里面
        }),
        new MiniCssExtractPlugun({
            filename: 'style/[contenthash].css'
        }),
    ],
    // 配置重新加载功能
    devServer: {
        static: './dist', // 打开的目录
    },
    // 配置模块的地方
    module: {
        // 配置规则
        rules: [
            {
                test: /\.png$/, // 加载的文件类型
                type: 'asset/resource', // 资源类型
                generator: {
                    filename: 'images/[contenthash][ext]'
                }
            },
            {
                test: /\.css$/,
                // use: ['style-loader','css-loader'], // 之前是通过style-loader放在style标签里
                use: [MiniCssExtractPlugun.loader,'css-loader'],// 抽离后，需要用新的loader
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, // 不需要编译的内容
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], //预设
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime'
                            ]
                        ]
                    }
                }
            },
        ]
    },
    // 优化的选项
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin()
        ]
    }
}