const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = Object.create(webpackBaseConfig);

baseConfig.devtool = 'source-map';

baseConfig.entry.main = [
    './src/js/index'
];

baseConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    }),
    new ExtractTextPlugin('css/[name].css', { allChunks: true })
);

baseConfig.module.loaders.push({
    test: /\.(css|scss|styl)$/, 
    include: /(src)/,
    loader: 'classnames!style!css?importLoaders=1&localIdentName=[local]---[name]---[hash:base64:5]!autoprefixer?browsers=last 3 versions!sass'
    //loaders: ['classnames', ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 3 versions!sass')]
});

baseConfig.module.loaders.push({
    test: /(\.scss|\.css)$/,
    include: /(node_modules)\/react-toolbox/,
    loaders: [
        require.resolve('style-loader'),
        require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        require.resolve('sass-loader') + '?sourceMap',
    ]
});

module.exports = baseConfig;
