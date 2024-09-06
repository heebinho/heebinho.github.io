import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";




//const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default {
  entry: './src/assets/scripts/main.js',
  output: {
    path: path.resolve('./', '_site/assets'),
    filename: 'main.js'
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  }
};
