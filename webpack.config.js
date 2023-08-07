const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  watch: false,
  mode: "production",
  entry: "./src/leaflet.AreaRuler.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'leaflet.AreaRuler.min.js',
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'window',
  externals: {
    leaflet: 'L',
    'leaflet-draw': 'L.Draw',
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
    new MiniCssExtractPlugin({ filename: 'leaflet.AreaRuler.css' }),
  ],
};
