const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

const mode = process.env.MODE || 'production';

module.exports = {
  mode: mode,
  entry: {
    main: './src/app/index.tsx',
    initColorScheme: './src/features/colorScheme/initColorScheme.ts',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve('./src/components'),
      '@app': path.resolve('./src/app'),
      '@images': path.resolve('./src/images'),
      '@features': path.resolve('./src/features'),
    },
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/initColorScheme\..+\.js$/],
    }),
    new EslintWebpackPlugin({
      files: '{**/*,*}.{tsx,ts,js}',
    }),
    new StylelintWebpackPlugin({
      files: '{**/*,*}.css',
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.[contenthash].css' }),
  ],
  devServer: {
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
