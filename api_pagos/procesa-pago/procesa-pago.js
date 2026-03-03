const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.get("/procesa", (req, res) => {
  const uuid = uuidv4();
  console.log("UUID generado en procesa-pago:", uuid);
  res.json({ uuid });
});

app.listen(9090, () => {
  console.log("Procesa Pago escuchando en 9090");
});
