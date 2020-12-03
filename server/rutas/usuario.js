const express = require("express");
const app = express();

app.get("/usuario", function (req, res) {
  //req (solicitud) res (respuesta)
  res.json({
    message: "GET usuario",
  });
});
app.post("/usuario", function (req, res) {
  //req (solicitud) res (respuesta)

  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      message: "El nombre es necesario",
    });
  } else {
    res.json({
      // message: "POST usuario",
      persona: body,
    });
  }
});

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

