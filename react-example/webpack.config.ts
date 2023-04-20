import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { TypingsForSCSS } from './webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const MODE = (process.env.NODE_ENV ?? 'production') as Configuration['mode'];
const devServer: DevServerConfiguration = {
  port: 8080,
  static: 'dist',
};

const config: Configuration = {
  devServer,
  mode: MODE,
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
                localIdentName: '[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [require('autoprefixer')],
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
      mode: MODE,
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
          <div id="root">React did not compile</div>
        </body>
      </html>
    `,
    }),
  ],
};

export default config;
