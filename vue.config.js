module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/resultados/" : "/",
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule("xlsx")
      .test(/\.xlsx$/)
      .use("webpack-xlsx-loader")
      .loader("webpack-xlsx-loader")
      .end();
  },
};
