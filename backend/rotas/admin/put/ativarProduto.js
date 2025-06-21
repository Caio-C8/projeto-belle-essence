const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE produtos SET ativo = true WHERE id_produto = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Produto não encontrado.",
      });
    }

    responder(res, {
      mensagem: "Produto ativado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao ativar produto:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao ativar produto.",
    });
  }
});

module.exports = router;
