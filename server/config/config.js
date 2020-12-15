//========Puerto==========
process.env.PORT = process.env.PORT || 3005;

//===Definir entorno====
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//===Base de datos======
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/rolling";
} else {
  urlDB =
    "mongodb+srv://user:rollingcode2020@cluster0.enaty.mongodb.net/rolling";
}

process.env.URLDB = urlDB;
