
const EncodingPlugin = require('webpack-encoding-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: '../dist',
        filename: 'bundle.js'
    },
    plugins: [new EncodingPlugin({
        //encoding: 'iso-8859-1' 
        encoding: 'utf-8'
    })]
};