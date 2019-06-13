const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    env        : NODE_ENV,
    basePath   : __dirname,
    srcDir     : 'src',
    outDir     : 'dist',
    publicPath : 'http://172.38.5.22:8001',
    publicPath : '/',
    // publicPath : '//static.bitcoco.com/',
    sourceMap  : true&& NODE_ENV == 'development' ? true : false,
    externals  : {},
    vendor     : ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react', 'crypto-js', 'js-cookie']
}
