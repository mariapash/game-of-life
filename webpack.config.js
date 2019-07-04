const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Path = require("path");

module.exports = (env, arg) => {
  const isProd = (arg.mode === 'production');
  const config = {
    entry: "./src/App.tsx",
    output: {
      path: Path.join(process.cwd(), "docs"),
      filename: "[name].[chunkhash].js",
      crossOriginLoading: false
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
      rules: [{
        test: /\.scss$/,
        loader: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader",
          options: { modules: 'global' }
        }, {
          loader: "sass-loader",
          options: { includePaths: ["./node_modules"] }
        }]
      }, {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: "./src/Template.html",
        hash: true,
        minify: isProd
      })
    ],
    devServer: {
      port: 4200,
      historyApiFallback: true
    },
  };

  if (isProd) {
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin()
    ]);
  }

  return config;
};
