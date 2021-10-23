const MySQL = require('../model/bbva');

module.exports = {
    setTransaccionProgramada: (titulo, cantidad, recurrenciaID, accountEntradaID, accountSalidaID) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            mysql.setTransaccionProgramada(titulo, cantidad, recurrenciaID, accountEntradaID, accountSalidaID).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}