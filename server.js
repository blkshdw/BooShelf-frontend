const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.development');

const app = express();
const compiler = webpack(config);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8095;

const hot = require('webpack-hot-middleware')(compiler);
const dev = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
});

app.use(dev);
app.use(hot);

app.get('*', (req, res) => {
    const index = dev.fileSystem.readFileSync(path.join(config.output.path, 'index.html'), 'utf8');
    res.end(index);
});

app.listen(PORT, err => {
    if (err) {
        console.log(err); // eslint-disable-line no-console
        return;
    }

    console.log(`Listening at http://${HOST}:${PORT}`); // eslint-disable-line no-console
});
