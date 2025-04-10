const express = require("express");
const router = express.Router();
const pool = require("../connect");

// GET /testes/administradores
router.get("/administradores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM administradores");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar administradores:", err);
    res.status(500).send("Erro no servidor.");
  }
});

module.exports = router;
