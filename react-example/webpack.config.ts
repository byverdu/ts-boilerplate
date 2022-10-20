import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const MODE = process.env.NODE_ENV ?? 'production';

const devServer: DevServerConfiguration = {
  port: 8080,
  static: 'dist',
};

const config: Configuration = {
  devServer,
  mode: MODE as Configuration['mode'],
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: path.resolve('./webpack-loader/index.js'),
            options: { pollo: 123 },
          },
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // ...(MODE === 'development'
    //   ? [
    //       new WebpackShellPluginNext({
    //         onBuildEnd: {
    //           parallel: true,
    //           scripts: ['pnpm build:style-typings'],
    //         },
    //       }),
    //     ]
    //   : []),

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
