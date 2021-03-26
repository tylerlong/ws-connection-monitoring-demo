/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unpublished-require */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv-override-true';
import {DefinePlugin} from 'webpack';

const config = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ws-connection-monitoring-demo',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
};

export default [config];
