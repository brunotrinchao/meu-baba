const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
// vue.config.js
module.exports = {
  lintOnSave: true,

  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        assets: resolveSrc('src/assets')
      }
    }
  },

  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  transpileDependencies: ['vuetify']
};
