const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

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