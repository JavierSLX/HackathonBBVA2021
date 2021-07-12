const MySQL = require("../model/bbva");

module.exports = {
    getUser: (id) => {
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getUser(id).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getAccess: (id, pass) => {
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getAccess(id, pass).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getAccounts: (id) => {
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getAccounts(id).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getPromotions: (id) => {
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getPromociones(id).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}