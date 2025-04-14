const express = require("express");
const router = express.Router();
const pool = require("../connect");

// GET /produtos - retorna todos os produtos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM produtos ORDER BY id_produto ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).send("Erro no servidor");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM produtos WHERE id_produto = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Produto não encontrado");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
