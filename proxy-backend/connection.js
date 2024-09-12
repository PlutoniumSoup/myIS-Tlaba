const Sequelize = require('sequelize');
const password = require('./db_password')
//**  Подключение к БД  **//
const sequelize = new Sequelize(
    'proxy', // название Базы Данных
    'root', // Пользователь Базы Данных
    password, // Пароль для пользователя root
    {
        host: 'localhost', // Адрес сервера БД
        dialect: 'mysql', // Название сервера БД

    }
);

// Экспорт экземпляра подключения
// Нужен для использования в других файлах
module.exports = sequelize;