const mysql = require('mysql');
const {mysqlHost, mysqlPass, mysqlPort, mysqlDB, mysqlUser} = require('./config');

class MySQL
{
    constructor()
    {
        this.mysqlObject = {host: mysqlHost, user: mysqlUser, password: mysqlPass, database: mysqlDB, port: mysqlPort};
    }

    /**
     * @description Obtiene el usuario a partir de su contraseña
     * @param {number} id 
     */
    getUser(id)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT id, nombre, apellido\
                FROM users \
                WHERE id = '${id}'`;

                connection.query(query, [], (error, result) => {
                    if(error)
                        reject(error);
                    else
                        resolve(result);

                    connection.end();
                });
            });
        });
    }

    /**
     * @description Permite realizar el logeo en la aplicación
     * @param {number} id 
     * @param {string} pass 
     * @returns 
     */
    getAccess(id, pass)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT c.id\
                FROM users u\
                JOIN credential c ON u.credential_id = c.id\
                AND u.id = ${id}\
                AND c.pass = '${pass}'`;

                connection.query(query, [], (error, result) => {
                    if(error)
                        reject(error);
                    else
                        resolve(result);
                });
            });
        });
    }

    /**
     * @description Permite la obtención de datos bancarios de un usuario
     * @param {number} id 
     */
    getAccounts(id)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT id, numero, tarjeta, clabe, saldo, user_id\
                FROM accounts
                WHERE user_id = ${id}`;

                connection.query(query, [], (error, result) => {
                    if(error)
                        reject(error);
                    else
                        resolve(result);
                });
            });
        });
    }

    /**
     * @description Permite la obtención de las promociones de un usuario
     * @param {number} id 
     * @returns 
     */
    getPromociones(id)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT p.id, p.descripcion, p.imagen\
                FROM user_promo u\
                JOIN promociones p ON u.promocion_id = p.id\
                WHERE u.user_id = '${id}'`;

                connection.query(query, [], (error, result) => {
                    if(error)
                        reject(error);
                    else
                        resolve(result);
                });
            });
        });
    }

    /**
     * @description Obtiene la promesa para poder conectar a la DB
     */
    connectMySQL()
    {
        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection(this.mysqlObject);
            connection.connect(error => {
                if(error)
                    reject(error);
                else
                    resolve(connection);
            });
        });
    }
}

module.exports = MySQL;