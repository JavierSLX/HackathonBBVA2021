const path = require('path');
const {getUser, getAccess, getAccounts, getPromotions, getSearchPromotions,getContacts} = require("../../../controller/bbvaController");

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

    //Petición que permite la obtención de los datos bancarios de un usuario
    app.get("/bbva/getaccounts", (request, response) => {

        let query = request.query;

        getAccounts(query.id).then(result => {
            response.status(200).json({codigo: 0, data: result});
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });

    //Peticion que permite la obtencion de las promociones de un usuario
    app.post("/bbva/getpromotions", (request, response) => {

        let body = request.body;
        getPromotions(body.id).then(result => {
            response.status(200).json({codigo: 0, data: result});
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: "Error"});
        });
    });

    //Peticion que permite la obtencion de las promociones de un usuario a partir de una busqueda
    app.post("/bbva/getpromotions/search", (request, response) => {

        let body = request.body;
        getSearchPromotions(body.id, body.search).then(result => {
            response.status(200).json({codigo: 0, data: result});
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: error});
        });
    });

    //Peticion que permite obtener una imagen de la carpeta de recursos
    app.get("/bbva/imagen", (request, response) => {

        let query = request.query;
        let rootDir = path.dirname(require.main.filename);
        response.status(200).sendFile(path.resolve(rootDir + `/resources/${query.elemento}.jpg`));
    });

    //Peticion que permite obtener una imagen de la carpeta de recursos
    app.post("/bbva/contactos", (request, response) => {

        let body = request.body;

        getContacts(body.id).then(result => {
            response.status(200).json({codigo: 0, data: result});
        }).catch(error => {
            console.log(error);
            response.status(500).json({codigo: 1, data: error});
        });
        
    });
};