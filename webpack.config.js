const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

let localCanisters, prodCanisters, canisters;

const LOCAL_II_CANISTER =
  'http://localhost:8000?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai';

function initCanisterIds() {
  try {
    localCanisters = require(path.resolve(
      '.dfx',
      'local',
      'canister_ids.json'
    ));
  } catch (error) {
    console.log('No local canister_ids.json found. Continuing production');
  }
  try {
    prodCanisters = require(path.resolve('canister_ids.json'));
  } catch (error) {
    console.log('No production canister_ids.json found. Continuing with local');
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === 'production' ? 'ic' : 'local');

  canisters = network === 'local' ? localCanisters : prodCanisters;

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + '_CANISTER_ID'] =
      canisters[canister][network];
  }
}
initCanisterIds();

const isDevelopment = process.env.NODE_ENV !== 'production';
const asset_entry = path.join('src', 'phonebook_assets', 'src', 'index.html');

module.exports = {
  target: 'web',
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, asset_entry).replace(/\.html$/, '.js')
  },
  devtool: isDevelopment ? 'source-map' : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    fallback: {
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      events: require.resolve('events/'),
      stream: require.resolve('stream-browserify/'),
      util: require.resolve('util/')
    }
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist', 'phonebook_assets')
  },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true // optional
            },
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, asset_entry),
      cache: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'phonebook_assets', 'assets'),
          to: path.join(__dirname, 'dist', 'phonebook_assets')
        }
      ]
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PHONEBOOK_CANISTER_ID: canisters['phonebook'],
      LOCAL_II_CANISTER
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve('buffer/'), 'Buffer'],
      process: require.resolve('process/browser')
    }),
    new VueLoaderPlugin()
  ],
  // proxy /api to port 8000 during development
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    hot: true,
    contentBase: path.resolve(__dirname, './src/phonebook_assets'),
    watchContentBase: true
  }
};
