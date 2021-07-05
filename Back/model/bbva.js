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

                let query = `SELECT u.id, u.nombre, u.apellido\
                FROM credential c\
                JOIN users u ON c.id = u.credential_id\
                WHERE u.id = '${id}'\
                AND c.activo = TRUE`;

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