const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ?
        '/hello-world/' :
        '/',
    devServer: {

        proxy: {
            '^/api/v1': {
                target: 'http://localhost:8080',
                ws: false,
                changeOrigin: true
            },
            '^/api/v2': {
                target: 'http://192.168.88.58:8085',
                ws: false,
                changeOrigin: true
            },
            '^/api/v3': {
                target: 'http://localhost:8084',
                ws: false,
                changeOrigin: true
            },

        }
    }
})