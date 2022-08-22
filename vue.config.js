const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ?
        '/hello-world/' : '/',
    devServer: {

        proxy: {
            '^/api/v2': {
                target: 'http://localhost:8086',
                ws: false,
                changeOrigin: true
            },
            '^/api/v3': {
                target: 'http://localhost:8000',
                ws: false,
                changeOrigin: true
            },

        }
    }
})