const express = require("express");

//---encriptar contraseñas
const bcrypt = require("bcrypt");
//---------------------------

//importacion de underscore para validaciones del PUT
const _ = require("underscore");

const app = express();

const Usuario = require("../modelos/usuario");

const {
  verificaToken,
  verificaAdminRole,
} = require("../middlewares/autenticacion");

app.get("/usuario", verificaToken, function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true })
    .skip(desde) //mostrar a partir del registro 5
    .limit(limite) //limita la cantidad de registros en pantalla
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.count({ estado: true }, (err, conteo) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        res.json({
          ok: true,
          usuarios,
          cantidad: conteo,
        });
      });
    });
});

//-----Metodo POST----------
app.post("/usuario", [verificaToken, verificaAdminRole], function (req, res) {
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

//Método PUT----------------------------
app.put(
  "/usuario/:id",
  [verificaToken, verificaAdminRole],
  function (req, res) {
    //req (solicitud) res (respuesta)
    let id = req.params.id;

    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    Usuario.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, usuarioDB) => {
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
      }
    );

    // res.json({
    //   message: "PUT usuario",
    // });
  }
);

app.delete(
  "/usuario/:id",
  [verificaToken, verificaAdminRole],
  function (req, res) {
    //req (solicitud) res (respuesta)
    let id = req.params.id;

    let estadoActualizado = {
      estado: false,
    };

    Usuario.findByIdAndUpdate(
      id,
      estadoActualizado,
      { new: true },
      (err, usuarioBorrado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        if (!usuarioBorrado) {
          return res.status(400).json({
            ok: false,
            message: "Usuario no encontrado",
          });
        }

        res.json({
          ok: true,
          usuario: usuarioBorrado,
        });
      }
    );
  }
);

module.exports = app;
