const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/mobile/'
        : '/',
    productionSourceMap: false,
    parallel: false,
    outputDir: "mobile",
    lintOnSave: true,
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    to: 'public',
                    toType: 'dir',
                }
            ]),
        ]
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 75,
                        propList: ['*']
                    })
                ]
            }
        }
    }
    // devServer:{
    // 	open:true,
    // 	host:'0.0.0.0',
    // 	port:8080,
    // 	http:false,
    // 	hotOnly:false,
    // 	proxy:{
    // 		//跨域配置
    // 		'/api':{
    // 			target:"xiaozhe.cn",
    // 			ws:true,
    // 			changeOrigin:true,
    // 			pathRewrite:{
    // 				'^/api':''
    // 			}
    // 		}
    // 	}
    // }	
}
