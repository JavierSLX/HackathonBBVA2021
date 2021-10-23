const path = require('path');
const {getContactos} = require('../../../controller/testController');

module.exports = (app) => {
    //Peticion de test
    app.post("/bbva/contactos", (request, response) => {
        let body = request.body;

        getContactos(body.id).then(result => {
            response.status(200).json({codigo: 0, data: result})
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });
}