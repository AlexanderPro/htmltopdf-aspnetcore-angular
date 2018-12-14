const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const dist = '../HtmlToPdf/wwwroot';

module.exports = function(env) {
  const production = env && env.production;
  const plugins = [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, 'src'),
      {}
    ),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true
    })
  ];

  return {
    entry: {
      'polyfills': './src/polyfills.ts',
      'app': './src/main.ts'
    },
    output: {
      path: path.resolve(__dirname, dist),
      publicPath: '/',
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {configFileName: path.resolve(__dirname, 'tsconfig.json')}
            },
            'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/app'),
          loader: 'raw-loader'
        }
      ]
    },
    plugins: plugins,
    resolveLoader: {
      moduleExtensions: ['-loader'],
    },
    mode: production ? 'production' : 'development',
    devtool: production ? '' : 'inline-source-map',
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, dist),
      publicPath: '/',
      proxy: {
        '/api': {
          target: 'http://localhost:5000'
        }
      }
    }
  }
};