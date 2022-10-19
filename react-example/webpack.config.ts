import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODE = process.env.NODE_ENV ?? 'production';

interface HtmlWebpackPluginOptions {
  htmlWebpackPlugin: {
    options: {
      title: string;
    };
  };
}

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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      inject: 'body',
      title: 'React Example',
      templateContent: ({ htmlWebpackPlugin }: HtmlWebpackPluginOptions) => `
      <html>
        <body>
          <h1>${htmlWebpackPlugin.options.title}</h1>
          <div id="root"></div>
        </body>
      </html>
    `,
    }),
  ],
};

export default config;
