const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.base');

const baseConfig = Object.create(webpackBaseConfig);

baseConfig.devtool = 'eval';

baseConfig.entry.main = [
    'webpack-hot-middleware/client',
    './src/js/index'
];

baseConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
);

baseConfig.module.loaders.push({
    test: /\.(css|scss|styl)$/, 
    include: /(src)/,
    loader: 'classnames!style!css?importLoaders=1&localIdentName=[local]---[name]---[hash:base64:5]!autoprefixer?browsers=last 3 versions!sass'
});

module.exports = baseConfig;
