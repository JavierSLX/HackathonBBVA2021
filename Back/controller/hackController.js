const MySQL = require('../model/bbva');

module.exports = {
    setPagoRecurrente: (titulo, cantidad, fecha, recurrenciaID, accountEntradaID, accountSalidaID) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            let date = fecha.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0]; 
            mysql.setPagoRecurrente(titulo, cantidad, date, recurrenciaID, accountEntradaID, accountSalidaID).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}