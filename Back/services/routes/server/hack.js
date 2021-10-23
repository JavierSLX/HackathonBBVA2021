const path = require('path');
const {setPagoRecurrente} = require('../../../controller/hackController');

module.exports = (app) => {
    //Peticion que permite registrar un pago recurrente
    app.post("/bbva/pagorecurrente", (request, response) => {
        let body = request.body;

        setPagoRecurrente(body.titulo, body.cantidad, body.fecha, body.recurrenciaID, body.entradaID, body.salidaID).then(result => {
            response.status(200).json({codigo: 0, data: result})
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });
}