module.exports = (app) => {
    app.get("*", (request, response) => {
        response.status(404).json({mensaje: "Ruta no definida"});
    });

    app.post("*", (request, response) => {
        response.status(404).json({mensaje: "Ruta no definida"});
    });
}