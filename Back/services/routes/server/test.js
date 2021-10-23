const path = require('path');
const {setTransaccionProgramada} = require('../../../controller/testController');

module.exports = (app) => {
    //Peticion que inserta valores
    app.post("/bbva/tareaprogramada", (request, response) => {
        let body = request.body;

        setTransaccionProgramada(body.titulo, body.cantidad, body.recurrenciaID, body.entradaID, body.salidaID).then(result => {
            response.status(200).json({codigo: 0, data: result})
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });
}