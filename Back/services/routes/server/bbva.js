const {getUser, getAccess} = require("../../../controller/bbvaController");

module.exports = (app) => {

    //Peticion de prueba
    app.get("/bbva/test", (request, response) => {
        response.status(200).json({codigo: 0, data: 'Exitoso'});
    });

    //Peticion que permite obtener un usuario
    app.post("/bbva/getuser", (request, response) => {
        let body = request.body;

        getUser(body.id).then(result => {

            let object = result.length > 0 ? result[0] : result;
            response.status(200).json({codigo: 0, data: object});
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });

    //Peticion que permite el logeo de un usuario
    app.post("/bbva/getaccess", (request, response) => {
        let body = request.body;

        getAccess(body.id, body.pass).then(result => {

            let object = result.length > 0 ? result[0] : {id: 0}
            response.status(200).json({codigo: 0, data: object});
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });
};