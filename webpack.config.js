const path = require('path')
const webpack = require("webpack")
const webroot = path.join(__dirname, 'www')

const config = {
    entry: './lib/mygame/client.js',
    output: {
        path: webroot,
        filename: 'index.js'
    },
    devServer: {
        contentBase: webroot
    }
}

module.exports = (env, argv) => {
    return config;
};