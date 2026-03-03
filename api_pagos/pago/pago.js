app.post("/pago", async (req, res) => {
  const { monto, producto } = req.body;

  if (!monto || !producto) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const response = await axios.get("http://procesa-pago:9090/procesa");
    const uuid = response.data.uuid;

    console.log("UUID recibido desde procesa-pago:", uuid);

    res.json({ uuid });

  } catch (error) {
    res.status(500).json({ error: "Error procesando pago" });
  }
});
