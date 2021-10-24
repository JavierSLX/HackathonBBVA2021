const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cron = require("node-cron");
const {getPagosRecurrentesPorFecha, setMovimiento, setRegistroAutomatico, disabledPagoRecurrente} = require('./controller/hackController');
const {fechaSiguiente} = require('./controller/bbvaController');

const app = express();

//Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static('resources'));

//Rutas
require('./services/routes/server')(app);
require('./services/routes/default')(app);

const server = app.listen(15000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}...`);
});

//Realiza los pagos programados a ese día
cron.schedule('00 50 6 * * *', async () => {

    //Saca la fecha del día de hoy
    let fechaNumber = Date.now();
    let fecha = new Date(fechaNumber).toLocaleDateString();

    try
    {
        //Saca los registros del día de hoy
        let pagos = await getPagosRecurrentesPorFecha(fecha);

        //Realiza los pagos programados a las cuentas
        let movimientos = new Array();
        let transacciones = new Array();
        let actualizaciones = new Array();
        for(let i = 0; i < pagos.length; i++)
        {
            let pago = pagos[i];

            let movimiento = await setMovimiento(pago.cantidad, pago.account_entrada, pago.account_salida, 1);
            movimientos.push(movimiento.id);

            let transaccion = await setRegistroAutomatico(pago.id);
            transacciones.push(transaccion.id);

            //Saca la nueva fecha si el pago no es unico
            if(pago.recurrencia_id != 1)
            {
                //FALTA POR EL PINCHE RAFA!!! ¬¬
            }
            else
            {
                let actualizacion = await disabledPagoRecurrente(pago.id);
                actualizaciones.push(actualizacion);
            }
        }
        
        console.log(`Se hicieron ${transacciones.length} movimiento/s el día ${fecha}`);
        
    }catch(error)
    {
        console.log(error);
    }
});

console.log(fechaSiguiente('2021-10-23', 2));