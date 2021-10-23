const MySQL = require('../model/bbva');

module.exports = {
    setPagoRecurrente: (titulo, cantidad, recurrenciaID, accountEntradaID, accountSalidaID) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            mysql.setTransaccionProgramada(titulo, cantidad, recurrenciaID, accountEntradaID, accountSalidaID).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getRecurrencia: () => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            mysql.getRecurrencia().then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    disabledPagoRecurrente: (id) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            mysql.disabledTransaccionProgramada(id).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}