const MySQL = require('../model/bbva');

module.exports = {
    setPagoRecurrente: (titulo, cantidad, fecha, recurrenciaID, accountEntradaID, accountSalidaID) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            let date = fecha.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0]; 
            mysql.setPagoRecurrente(titulo, cantidad, date, recurrenciaID, accountEntradaID, accountSalidaID).then(result => {
                let resultado = {"mensaje": "Registro exitoso!", "id": result.insertId};
                resolve(resultado);
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

            mysql.disabledPagoRecurrente(id).then(result => {
                let resultado = {"mensaje": "Registro eliminado correctamente!", "info": `Registros afectados: ${result.affectedRows}`};
                resolve(resultado);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getPagosRecurrentes: (id) => {
        return new Promise((resolve, reject) => {
            let mysql = new MySQL();

            mysql.getPagosRecurrentes(id).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}