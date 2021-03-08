module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'static': '@/static',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'pages': '@/pages',
      }
    }
  }
}