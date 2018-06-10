const path = require('path');
const distDir = path.join(__dirname, '/dist');

module.exports = {
    mode: 'development',
    entry:  `${__dirname}/src/js/index.js`,
    output: {
        path: `${__dirname}/dist/js/`,
        publicPath: '/',
        filename: 'main.js',
    },
    serve: {
        content: 'dist',
        port: 3000,
        open: true
    },
    module: {
        rules: [
            /**
             * JavaScript Settings
             */
            {
                test: /\.js$/,
                use: [{
                    loader: "source-map-loader"
                }],
                enforce: "pre"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true,
                            failOnWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {'modules': false} ]
                            ]
                        }
                    }
                ]
            },
            /**
             * CSS Settings
             */
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            minimize: true,
                            sourceMap: true,
                            minimize: true,
                            importLoaders: 2
                        }
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        sourceMap: true,
                      }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true,
                        plugins: [
                          require('autoprefixer')({grid: true})
                        ]
                      },
                    }
                ]
            },
            {
              test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 100 * 1024,
                    name: './img/[name].[ext]'
                  }
                }
              ]
            }
        ]
    }
};