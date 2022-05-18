const path = require("path"); // утилита преобразования относительных путей в абсолютные
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// подключаем к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { // точка входа
        main: './src/js/index.js'
    },
    output: { // точка выхода
        path: path.resolve(__dirname, 'dist'), // путь к точке выхода
        filename: 'main.js', // имя файла точки выхода
        publicPath: '' // свойство для обновления путей внутри CSS и HTML
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'), // путь куда смотрит дев-режим
        compress: true, // это ускорит загрузку в дев-режиме
        port: 8080, // порт, чтобы открывать сайт по адресу - localhost:8080
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            /*{
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },*/
            // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    // добавьте объект options
                    options: { importLoaders: 1 }
                    // Эта опция описана в документации сss-loader. Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
                },
                // добавляем postcss-loader
                'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
};
