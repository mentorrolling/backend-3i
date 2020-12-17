//========Puerto==========
process.env.PORT = process.env.PORT || 3005;

//===Definir entorno====
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//===Base de datos======
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/rolling";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//===Caducidad de Token=====
process.env.CADUCIDAD_TOKEN = "48h";

//====Semilla===========
process.env.SEED = process.env.SEED || "este_es_el_semilla";
