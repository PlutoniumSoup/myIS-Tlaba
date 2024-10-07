const Sequelize = require('sequelize');
const password = require('./db_password')
//**  Подключение к БД  **//
const sequelizeProxy = new Sequelize(
    'proxy', // название Базы Данных
    'root', // Пользователь Базы Данных
    password, // Пароль для пользователя root
    {
        host: 'localhost', // Адрес сервера БД
        dialect: 'mysql', // Название сервера БД

    }
);

const sequelizeAct = new Sequelize(
    'act', // название Базы Данных
    'root', // Пользователь Базы Данных
    password, // Пароль для пользователя root
    {
        host: 'localhost', // Адрес сервера БД
        dialect: 'mysql', // Название сервера БД

    }
);

// Экспорт экземпляра подключения
// Нужен для использования в других файлах
module.exports = module.exports = { sequelizeProxy, sequelizeAct };;