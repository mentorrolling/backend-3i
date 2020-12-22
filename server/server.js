require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//install npm cors --save
/* El intercambio de recursos de origen cruzado ( CORS ) 
es un mecanismo que permite que los recursos restringidos 
en una página web se soliciten desde otro dominio fuera del 
dominio desde el que se sirvió el primer recurso */
const cors = require("cors");

const app = express();

app.use(cors()); //Middleware para el CORS

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./rutas/index"));

//Creamos conexion con mongoDB
mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos online ");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Genial! estamos online:", process.env.PORT);
});
