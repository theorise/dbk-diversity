const webpack           = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vendors =  './node_modules/';

module.exports = {
    entry: {
      'index': './input/js/index.js',
      'secondary': './input/js/secondary.js',
    },
    output: {
        path: __dirname + '/output',
        filename: "dbk.microsite.[name].js"
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        query: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        query: '$'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(styl|css)$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!stylus-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(pug)$/,
                use: 'pug-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./styles.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: './input/index.pug'
        }),
        new HtmlWebpackPlugin({
            chunks: ['index', 'secondary'],
            filename: 'test',
            template: './input/test.pug'
        })
    ]
};
