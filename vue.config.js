const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const appTitle = process.env.VUE_APP_TITLE; // 网页标题

const port = 3889; // 端口

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port,
    open: false
  },
  chainWebpack: (config) => {
    config.module
      .rule('svgIcon')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('file-loader');
    config.plugin('html').tap((args) => {
      args[0].title = appTitle;
      return args;
    });
  }
});
