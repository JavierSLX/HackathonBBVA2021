require('dotenv').config();

const config = {
    mysqlHost: process.env.MYSQL_HOST,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPass: process.env.MYSQL_PASS,
    mysqlPort: process.env.MYSQL_PORT,
    mysqlDB: process.env.MYSQL_DB
};

module.exports = config;