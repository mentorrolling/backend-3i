require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//install npm cors --save
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
