var webpack = require('webpack');
var pkg = require('./package.json');
var banner = `
    SuperMap Leaflet.(${pkg.homepage})
    Copyright© 2000-2017 SuperMap Software Co. Ltd
    license: ${pkg.license}
    version: v${pkg.version}
`;
module.exports = {
    entry: __dirname + "/src/SuperMapLeaflet.js",
    output: {
        path: __dirname + "/dist",
        filename: 'SuperMapLeaflet.debug.js'
    },

    resolve: {
        extensions: ['.js', '.json']
    },
    devtool: "source-map",
    externals: {
        'leaflet': 'L'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};