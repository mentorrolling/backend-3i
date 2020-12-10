const express = require("express");

//---encriptar contraseñas
const bcrypt = require("bcrypt");
//---------------------------

const app = express();

const Usuario = require("../modelos/usuario");

app.get("/usuario", function (req, res) {
  //req (solicitud) res (respuesta)

  res.json({
    message: "GET usuario",
  });
});

//-----Metodo POST----------
app.post("/usuario", function (req, res) {
  //req (solicitud) res (respuesta)

  let body = req.body;

  //crear instancia del modelo Usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });

  // if (body.nombre === undefined) {
  //   res.status(400).json({
  //     ok: false,
  //     message: "El nombre es necesario",
  //   });
  // } else {
  //   res.json({
  //     // message: "POST usuario",
  //     persona: body,
  //   });
  // }
});
//------------------------------------

app.put("/usuario/:id", function (req, res) {
  //req (solicitud) res (respuesta)
  res.json({
    message: "PUT usuario",
  });
});
app.delete("/usuario", function (req, res) {
  //req (solicitud) res (respuesta)
  res.json({
    message: "DELETE usuario",
  });
});

module.exports = app;
