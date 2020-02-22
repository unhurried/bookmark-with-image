module.exports = {
  devServer: {
    host: 'localhost',
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // To build a portable .exe file.
        // win: { target: "portable" }
      },
      externals: [ 'axios', 'cheerio-httpcli' ],
    }
  }
};
