const { query } = require('express');
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

                let query = `SELECT id, numero, tarjeta, clabe, user_id\
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
     * @description Permite la obtencion de los saldos al corte
     * @param {number} id 
     */
    getSaldoUser(id)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT s.cantidad, a.numero, a.tarjeta
                FROM saldo_corte s
                JOIN accounts a ON s.account_id = a.id
                WHERE a.user_id = ${id}`;

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
     * @description Permite la obtencion de la suma de un determinado movimiento
     * @param {number} id
     * @param {string} option
     */
    getMovimientos(id, option)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {
                let query = `SELECT SUM(m.cantidad) as cantidad
                FROM movimientos m
                JOIN categoria c ON m.categoria_id = c.id `
                
                if(option == 'Transferencia')
                    query += `JOIN accounts a ON m.account_entrada = a.id `;
                else
                    query += `JOIN accounts a ON m.account_salida = a.id `

                query += `WHERE a.id = ${id}
                AND c.nombre = '${option}'`;

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

                let query = `SELECT p.id, p.titulo, p.descripcion, p.imagen\
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
     * @description Obtiene las promociones a partir de una búsqueda
     * @param {number} id 
     * @param {string} search 
     * @returns 
     */
    getSearchPromotions(id, search)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT p.id, p.titulo, p.descripcion, p.imagen\
                FROM user_promo u\
                JOIN promociones p ON u.promocion_id = p.id\
                WHERE u.user_id = ${id}\
                AND p.titulo LIKE '${search}%'`;

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
     * @description Obtiene una lista de contactos a partir de un id
     * @param {number} id 
     */
    getContactos(id)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT u.id AS idUser, a.id AS idAccount, CONCAT(u.nombre, ' ', u.apellido) AS nombre, a.numero
                FROM users u
                JOIN accounts a ON a.user_id = u.id
                WHERE u.id <> ${id}`;

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
     * @description Obtiene una lista de la recurrencia de los pagos automaticos
     * @param {number} id 
     * @param {string} nombre 
     */
    getRecurrencia()
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT id, nombre
                FROM recurrencia
                WHERE activo = TRUE`;
    
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
     * @description Inserta un pago de manera automatica
     * @param {string} titulo 
     * @param {number} cantidad 
     * @param {string} fecha 
     * @param {number} accountEntradaID 
     * @param {number} accountSalidaID 
     */
    setPagoRecurrente(titulo, cantidad, fecha, recurrenciaID, accountEntradaID, accountSalidaID)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `INSERT INTO pagos_automaticos(titulo, cantidad, fecha, recurrencia_id, account_entrada, account_salida) 
                VALUES ('${titulo}', ${cantidad}, '${fecha}', ${recurrenciaID}, ${accountEntradaID}, ${accountSalidaID})`;

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
     * @description Desactiva un pago recurrente
     * @param {number} pagoID 
     */
    disabledPagoRecurrente(pagoID)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `UPDATE pagos_automaticos
                SET activo = false
                WHERE id = ${pagoID}`;

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
     * @description Obtiene una lista de pagos recurrentes del usuario
     * @param {number} userID 
     */
    getPagosRecurrentes(userID)
    {
        return new Promise((resolve, reject) => {
            this.connectMySQL().then(connection => {

                let query = `SELECT p.id, p.titulo, c.contacto, p.cantidad, a.numero AS cuenta, date_format(p.fecha, '%d-%m-%Y') AS fecha, r.nombre AS recurrencia
                FROM (SELECT pa.id, CONCAT(us.nombre, ' ', us.apellido) AS contacto
                    FROM pagos_automaticos pa
                    JOIN accounts ac ON ac.id = pa.account_entrada
                    JOIN users us ON us.id= ac.user_id
                    AND pa.account_entrada = account_entrada) AS c
                JOIN pagos_automaticos p ON c.id = p.id
                JOIN recurrencia r ON p.recurrencia_id = r.id
                JOIN accounts a ON a.id = p.account_salida
                JOIN users u ON u.id = a.user_id
                WHERE p.activo = TRUE
                AND u.id = ${userID}`;

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