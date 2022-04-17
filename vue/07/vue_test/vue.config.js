// commonjs暴露
// 
module.exports = {
  pages: {
    index: {
      // 入口
      entry: 'src/main.js',
    },
  },
  lintOnSave: false, // 关闭语法检查
  /**
   * 方式一
   * 开启代理服务器
   * 缺点：1、只能配置一个代理  2、不能灵活的决定那个需要转发，哪些不需要
   */
  // devServer: {
  //   proxy: 'https://www.baidu.com'
  // }

  /**
   * 方式二
   * 
   */
  devServer: {
    proxy: {
      '/api': { // 请求前缀
        target: 'https://www.baidu.com',
        pathRewrite: {'^/api':''},
        ws: true, // 用于支持websocket
        changeOrigin: true // 用于控制请求头中的host值
      },
    }
  }
}