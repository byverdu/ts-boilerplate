import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TypingsForSCSS = require('./webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const MODE = process.env.NODE_ENV ?? 'production';

const devServer: DevServerConfiguration = {
  port: 8080,
  static: 'dist',
};

const config: Configuration = {
  devServer,
  mode: MODE as Configuration['mode'],
  target: 'browserslist',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new StylelintPlugin({
      configFile: './.stylelintrc.json',
      context: './src/**/*.scss',
      fix: true,
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      fix: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new TypingsForSCSS({
      webpackMode: MODE,
    }),
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      inject: 'body',
      title: 'React Example',
      templateContent: `
      <html>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `,
    }),
  ],
};

export default config;
