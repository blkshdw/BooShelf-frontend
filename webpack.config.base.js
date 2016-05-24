const path = require('path');
const webpack = require('webpack');
const ConfigPlugin = require('webpack-config-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'vendor': [
            // js
            'react',
            'redux',
            'selectn',
            'reselect',
            'react-dom',
            'normalizr',
            'classnames',
            'react-redux',
            'redux-thunk',
            'react-router',
            'redux-router',
            'redux-combine-actions',
            'bootstrap-loader'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ConfigPlugin({
            dir: path.join(__dirname, 'config')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/assets/index.html'),
            //favicon: path.join(__dirname, 'src/assets/favicon.ico')
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'src/assets/icons'),
            to: 'icons'
        }])
    ],
    resolve: {
        extensions: ['', '.js', '.scss', '.css'],
        modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './node_modules')
        ],
        alias: {
            'src': path.join(__dirname, 'src'),
            'css': path.join(__dirname, 'src/css'),
            'img': path.join(__dirname, 'src/img'),
            'api': path.join(__dirname, 'src/js/api'),
            'utils': path.join(__dirname, 'src/js/utils'),
            'actions': path.join(__dirname, 'src/js/actions'),
            'reducers': path.join(__dirname, 'src/js/reducers'),
            'selectors': path.join(__dirname, 'src/js/selectors'),
            'constants': path.join(__dirname, 'src/js/constants'),
            'containers': path.join(__dirname, 'src/js/containers'),
            'components': path.join(__dirname, 'src/js/components'),
            'middleware': path.join(__dirname, 'src/js/middleware')
        }
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
            { test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/, loader: 'url?limit=500000' },
            { test: /\.json$/, loader: 'json' },
            { test: /plugin\.css$/,
                loaders: [
                'style', 'css',
            ]},
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' }
            // { test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000' },
            // { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' }
        ]
    }
};
