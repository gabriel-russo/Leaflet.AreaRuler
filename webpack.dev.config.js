const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: "./src/leaflet.myplugin.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'leaflet.myplugin.min.js',
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'window',
  externals: {
    leaflet: 'L',
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'leaflet.myplugin.css' }),
  ],
};
