const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Crear tabla si no existe
pool.query(`
  CREATE TABLE IF NOT EXISTS valores (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL
  );
`);

// POST
app.post("/valores", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "Nombre requerido" });
    }

    // consumo CPU obligatorio
    let suma = 0;
    for (let i = 1; i <= 1000; i++) {
      for (let j = 1; j <= 1000; j++) {
        suma += i + j;
      }
    }

    await pool.query("INSERT INTO valores(nombre) VALUES($1)", [nombre]);

    res.status(201).json({ message: "Guardado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error interno" });
  }
});

// GET
app.get("/valores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM valores");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error interno" });
  }
});

app.listen(3000, () => console.log("Backend corriendo en puerto 3000"));
