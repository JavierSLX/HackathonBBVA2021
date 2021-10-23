const MySQL = require('../model/bbva');

module.exports = {
    getContactos: (id) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            mysql.getContactos(id).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}