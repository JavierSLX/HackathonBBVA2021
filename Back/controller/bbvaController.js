const MySQL = require("../model/bbva");
 function getDatosCuenta(array) {
    return new Promise( async(resolve, reject) => {

        let arrayCuenta = array.split(',')
       

        let info =[];
        let elemento='';
        let nivel1 = [];
        let nivel2 = [];

        for (var i =0; i<(Object.keys(arrayCuenta).length); i++){
        elemento += arrayCuenta[i]
            if((i+1)%2 == 0)
                elemento += ":"
            else
                elemento +=","
        
    
        }
        elemento = elemento.slice(':',-1)

        nivel1 = elemento.split(':')
        for(var r = 0; r<Object.keys(nivel1).length; r++){
            nivel2 =nivel1[r].split(',')
         
            
            info.push({
                'idAcount': nivel2[0],
                'Account': nivel2[1]
            })
        }

        if(info.length>=1)
    resolve(info)
    else
    reject("0")


    });

}

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
    getContacts: (id) => {
        return new Promise((resolve, reject) => {

            let mysql = new MySQL();

            mysql.getContactosUser(id).then(async result => {
                let datos = result;
                let resultado = [];

               for(var r = 0; r<datos.length; r++){
               

                    resultado.push({
                        "idUser":datos[r].idUser,
                        "nombre" : datos[r].nombre,
                        "cuentas" : await getDatosCuenta(datos[r].cuentas)      

                    })
                     
                }

                
                resolve(resultado);
            }).catch(error => {
                reject(error);
            });
        });
    },
    fechaSiguiente: fechaSiguiente
}

function fechaSiguiente(fechaEnvio, id){
    //mes actual
    var fechaActual = new Date()
    var mesActual = fechaActual.getMonth() + 1

    var fechaDescompuesta = fechaEnvio.split("-", 3)

    var anoActual = parseInt(fechaDescompuesta[0])
    var mes  = parseInt(fechaDescompuesta[1])
    var dia = parseInt(fechaDescompuesta[2])
    
    //dias del mes
    function diasEnUnMes(mes, anoActual) {
        return new Date(anoActual, mes, 0).getDate();
    }

    var nuevoDia;

    //entra si es diferenete a 1 (unico)
    if( id !== 1){
        switch(id){
            case 2:
                if(dia === diasEnUnMes(mes, anoActual)){
                    if(mes === 12){
                        mes = 1
                    }else{
                        mes = mes + 1
                    }
                    if(mes <= 9){
                        mes = "0" + mes
                    }
                    return nuevoDia = anoActual + "-" + mes + "-" + 1
                }else{ 
                    var sumaDia = parseInt(dia) + 1
                    if(sumaDia <= 9){
                        sumaDia = "0" + sumaDia
                    }
                    if(mes <= 9){
                        mes = "0" + mes
                    }
                    return nuevoDia = anoActual + "-" + mes + "-" + sumaDia
                }
                break;
            case 3:
                if(dia + 7 <= diasEnUnMes(mes, anoActual)){
                    var sumaDia = dia + 7
                    if(sumaDia <= 9){
                        sumaDia = "0" + sumaDia
                    }
                    if(mes <= 9){
                        mes = "0" + mes
                    }
                    return nuevoDia = anoActual + "-" + mes + "-" + sumaDia
                }else{
                    if(mes === 12){
                        mes = 1
                        anoActual = anoActual + 1
                    }else{
                        mes = mes + 1
                    }
                    var restaDia = diasEnUnMes(mesActual, anoActual) - dia;
                    var dias = 7 - restaDia 
                    if(dias <= 9){
                        dias = "0" + dias
                    }
                    if(mes <= 9){
                        mes = "0" + mes
                    }
                    return nuevoDia = anoActual + "-" + mes + "-" + dias
                }
                break;
            case 4:
                if(dia + 14 <= diasEnUnMes(mes, anoActual)){
                    var sumaDia = dia + 14
                    return nuevoDia = anoActual + "-" + mes + "-" + sumaDia
                }else{
                    if(mes === 12){
                        mes = 1
                        anoActual = anoActual + 1
                    }else{
                        mes = mes + 1
                    }
                    var restaDia = diasEnUnMes(mesActual, anoActual) - dia;
                    var dias = 14 - restaDia
                    if(dias <= 9){
                        dias = "0" + dias
                    }
                    if(mes <= 9){
                        mes = "0" + mes
                    }
                    return nuevoDia = anoActual + "-" + mes + "-" + dias
                }
                break;
            case 5:
                if(mes === 12){
                    mes = 1
                    anoActual = anoActual + 1
                }else{
                    mes = mes + 1
                }
                var existe = false
                for(var i = 0; i < parseInt(diasEnUnMes(mes, anoActual)); i++){
                    if(dia === i){
                        existe = true
                    }
                }
                if(dia <= 9){
                    dia = "0" + dia
                }
                if(mes <= 9){
                    mes = "0" + mes
                }
                if(existe === true){
                    return nuevoDia = anoActual + "-" + mes + "-" + dia
                }else{
                    return nuevoDia = anoActual + "-" + mes + "-" + diasEnUnMes(mes, anoActual)
                }
                break;
            case 6:
                var existe = false
                for(var i = 0; i < diasEnUnMes(mes, anoActual + 1); i++){
                    if(dia === i){
                        existe = true
                    }
                }
                if(dia <= 9){
                    dia = "0" + dia
                }
                if(mes <= 9){
                    mes = "0" + mes
                }
                if(existe === true){
                    var anoNuevo = anoActual + 1
                    return nuevoDia = anoNuevo + "-" + mes + "-" + dia
                }else{
                    var anoNuevo = anoActual + 1
                    return nuevoDia = anoNuevo + "-" + mes + "-" + diasEnUnMes(mes, anoActual + 1)
                }
                break;
        }
    }
}