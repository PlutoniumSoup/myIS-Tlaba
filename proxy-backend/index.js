/**  Подключение зависимостей  */
const { sequelizeProxy, sequelizeAct } = require('./connection.js');
const express = require('express');
const cors = require('cors');
const {proxyRouter} = require('./routers/proxy-router.js');
const {actRouter} = require('./routers/act-router.js');

const PORT = 8081;
/**  Экземпляр приложения  */
const app = express();

/**  Подключение middlewares  */
app.use(express.json());
app.use(cors());
app.use('/api/proxy', proxyRouter)
app.use('/api/act', actRouter)


//**  Проверка подключения к БД  **//
const assertDatabaseConnectionOk = async () => {
    console.log(`Checking database connections...`);
    try {
        await sequelizeProxy.authenticate();
        console.log('Proxy database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the proxy database:');
        console.log(error.message);
    }

    try {
        await sequelizeAct.authenticate();
        console.log('Act database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the act database:');
        console.log(error.message);
    }
}

/**  Функция старта приложения  */
const start = async () => {
    try {
        await assertDatabaseConnectionOk();
        app.listen(PORT, () => console.log(`Server run on port - ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
