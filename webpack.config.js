const path = require("path"); // утилита преобразования относительных путей в абсолютные

module.exports = {
    entry: { // точка входа
        main: './src/index.js'
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

        open: true, // сайт будет открываться сам при запуске npm run dev
    },
}
