const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	// 代理伺服器
	devServer: {
		proxy: {
			'/api': {
				target: 'http://gmall-h5-api.atguigu.cn',
				// pathRewrite: { '^/api': '' },
			},
		},
	},
});
