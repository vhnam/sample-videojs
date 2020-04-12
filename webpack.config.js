module.exports = {
  module: {
    rules: [
      {
        loader: 'url-loader?limit=100000',
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      },
    ],
  },
};
