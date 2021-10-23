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
        return new Promise(async (resolve, reject) => {

            let mysql = new MySQL();

            try
            {
                let result = await mysql.getAccounts(id);
                let saldoCorte = await mysql.getSaldoUser(id);
                

                //Realiza los cambios para dar el saldo de acuerdo al calculo
                for(let i = 0; i < result.length; i++)
                {
                    let account = result[i];

                    //Saca los depositos y salidas de saldo de cada cuenta del usuario
                    let depositos = await mysql.getMovimientos(account.id, 'Transferencia');
                    let salidas = await mysql.getMovimientos(account.id, 'Salida');

                    depositos = depositos[0].cantidad == null ? 0 : depositos[0].cantidad;
                    salidas = salidas[0].cantidad == null ? 0 : salidas[0].cantidad;

                    account.saldo = saldoCorte[i].cantidad + depositos + salidas;
                }

                resolve(result);
            }catch(error)
            {
                reject(error);
            }
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
    },
    getSearchPromotions: (id, search) => {
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getSearchPromotions(id, search).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getTask:(id, titulo, cantidad, fecha, repetir, activo, contacto, numero_cuenta) =>{
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getTask(id, titulo, cantidad, fecha, repetir, activo, contacto, numero_cuenta).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error)
            })
        })
        
    }
}