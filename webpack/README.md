# webpack学习

vite: 下一代前端开发与构建工具（现在比较热门，和vue3相关）

## 1、安装
1、全局安装
    npm install webpack webpack-cli -g
2、仅在本地项目中安装
    npm install webpack webpack-cli --save-dev
> 安装webpack需要安装两个，一个是webpack主包，一个是webpack-cli

## 2、运行
    npx webpack
    如果是非全局安装，执行 webpack的时候会报：command not found: webpack，可以使用npx webpack 命令执行（Node 8.2/npm 5.2.0 以上版本提供的 npx 命令）
    默认打包src目录下的内容，执行npx webpack --stats detailed：可以打印出打包的详细信息
## 自定义webpack
    1、在根目录下创建一个文件：webpack.config.js(文件名不能随便取，需要设置成这个)
    2、具体参数内容说明参考webpack.config.js

## 自动引入资源
1、什么是插件
> 插件 是 webpack 的 支柱 功能。Webpack 自身也是构建于你在 webpack 配置中用到的 相同的插件系统 之上！插件目的在于解决 loader 无法实现的其他事
#### HtmlWebpackPlugin
> 自动生成html入口文件和引用js文件
    1、安装
    npm install --save-dev html-webpack-plugin
    2、配置
    引入：const HtmlWebpackPlugin = require('html-webpack-plugin');
    实例化：new HtmlWebpackPlugin()
    3、执行打包
    打包之后，在dist文件中会生成一个index.html文件，且引入了打包后的js，但是这个html是webpack自动生成的，与根目录下的html没有关系
    所以还需要调整，可以增加参数
#### 清理dist
    现在每次打包，更换了出口文件后，上一次打包的文件还在，需要清理
    在output里配置：clean:true
#### 搭建开发环境
    mode: development
#### source map 进行代码的调试
> 我们用编译后的文件打开浏览器，如果出现问题，定位到的也是编译后文件的位置，而不是源文件，devtool: 'inline-source-map',配置后，可以通过浏览器找到源文件的错误位置
#### 使用watch mode观察模式
> 现在我们修改完js文件后，需要重新编译，可以使用命令来实时监测js文件的变化
    npx webpack --watch

#### webpack-dev-server
> 提供了一个基本的web server，并且具有live reloading（实时重新加载功能）
使用：
    1、安装
    npm install --save-dev webpack-dev-server
    2、在配置文件中去配置
    devServer: {
        static: './dist'
    }
    3、运行
    npx webpack-dev-server
    运行成功后会打开一个8080的端口，打开的目录就是dist
注意：webpack-dev-server没有输出任何的物理文件，可以看到在修改js的过程中，dist中的文件没有任何变化，他是把输出的打包的文件放到内存中了

## 资源模块
> asset module(资源模块)，允许我们运用webpack来打包其他文件，如字体，图片
四种类型
    1、asset/resource：他会发送一个单独的文件并导出URL
    2、asset/inline：会导出一个资源的Data Url
    3、asset/source：会导出资源的源代码
    4、asset：在导出一个Data URL和发送一个单独的文件之间自动进行选择
#### asset/resource
    module: {
        // 配置规则
        rules: [
            {
                test: /\.png$/, // 加载的文件类型
                type: 'asset/resource', // 资源类型
            }
        ]
    }
    配置后，打包时会可以编译图片，且讲图片打包到dist下，也可以自定义打包的目录
    1、在output中配置
    assetModuleFilename: 'images/test.png‘
    这样写的话，是把资源打包到来images文件夹中，且名字为test.png，实际不可能只有一个资源，因此这里可以用下面的方式
    assetModuleFilename: 'images/[contenthash][ext]', // contenthash:默认生成的hash值  ext：扩展名

    2、在定义rules的时候，可以定义一个属性：generator
注意：如果两处都定义来，则generator中优先级更高

#### asset/inline
    module: {
        // 配置规则
        rules: [
            {
                test: /\.svg$/, // 加载的文件类型
                type: 'asset/inline', // 资源类型
            }
        ]
    }
    其他类似

## 管理资源（load）
> webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

使用：
    load定义有两个属性
    module: {
        rules: [
            { 
                test: /\.txt$/, // 识别出哪些文件会被转换。
                use: 'raw-loader' , // 定义出在进行转换时，应该使用哪个 loader。
            }
        ],
    },

#### load 加载css文件
1、安装
    npm install --save-dev css-loader
    加载css样式，还需要一个loader
    style-loader
2、配置
    {
        test: /\.css$/,
        use: ['style-loader','css-loader']
    }
如果需要处理预编译样式，如less，sass等，也需要下载相应的loader
如less
    npm install less-loader less --save-dev

#### 抽离和压缩css
> 现在的css打包后是放在html里的，现在我们要把他单独放在一个文件里，需要一个插件来帮忙：mini-css-extract-plugin
mini-css-extract-plugin是基于webpack5的
1、安装
    npm install mini-css-extract-plugin
2、引入
    const MiniCssExtractPlugun = require('mini-css-extract-plugin');
    实例化：new MiniCssExtractPlugun();
3、打包
    打包后，会在dist中生成一个main.css文件，且在html中自动引入里
补充：可以自定义打包后的文件名，在plugin中定义
4、压缩
    目前打包的css文件没有压缩，需要压缩一下，这个也需要插件来帮忙
    css-minimizer-webpack-plugin
    引入:
    const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
    配置：不是在plugin中去做配置，而是在优化中配置
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin()
        ]
    }
    还需要将模式改成 production

#### 加载images图像
    之前已经配置过，css中也可以加载

#### 加载font字体
> 使用 asset modules 可以接收并加载任何文件，然后将其输出到构建的目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。
module: {
        rules: [
            { 
                test: /\.(woff|woff2|eot|ttf|otf)$/, // 识别出哪些文件会被转换。
                type: 'asset/resource'
            }
        ],
    },

#### 加载数据
> 可以加载的有用资源还有数据，如json文件，csv，tsv和xml，类似nodejs，json支持实际上是内置的，也就是说 import Data from './data.json',默认正常运行，要导入csv，tsv和xml，可以使用csv-loader 和xml-loader

#### 自定义json模块 parser
> 通过使用自定义parser替代特定的webpack loader，可以将任何toml，yaml或json5文件作为json模块导入
1、安装
    npm install toml yaml json5 --save-dev
2、配置
    const toml = require('toml');
    module: {
        // 配置规则
        rules: [
            {
                test: /\.toml$/, // 加载的文件类型
                type: 'json', // 资源类型
                parser: {
                    parse: toml.parse
                }
            },
        ]
    },

## 使用babel-loader
> 此 package 允许你使用 Babel 和 webpack 转译 JavaScript 文件。
如es6代码，如不做任何处理，则打包后的文件还是es6代码，babel-loader可以将es6代码转成es5代码，这样低版本浏览器也可以识别
使用：
    1、安装
    npm install -D babel-loader @babel/core @babel/preset-env
    babel-loader：在webpack里应用babel解析es6的桥梁
    @babel/core：babel核心模块
    @babel/preset-env：babel预设，一组babel插件的集合
    2、配置
    在 webpack 配置对象中，需要将 babel-loader 添加到 module 列表中，就像下面这样
    module: {
        // 配置规则
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, // 不需要编译的内容
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], //预设
                    }
                }
            },
        ]
    }
注意：这样直接打包，编译可以通过，但是在浏览器运行时会报错：regeneratorRuntime is not defined
> regeneratorRuntime 是webpack打包生成的全局辅助函数，由babel生成，用于兼容 async/await的语法
解决：
    还需要添加插件和配置
    npm install @babel/runtime -D: 包含里regeneratorRuntime运行时需要的内容
    npm install @babel/plugin-transform-runtime : 在需要regeneratorRuntime的时候自动导包
    配置：这是 babel-loader需要的插件，因此在babel-loader中配置