const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const { listarTodos, listarPorId } = require("../../handlers/handlerListar");
const responder = require("../../utilidades/responder");

router.get("/:id", listarPorId("produtos", "id_produto"));

router.get("/categorias/:idProduto", async (req, res) => {
  const { idProduto } = req.params;

  try {
    const result = await pool.query(
      `
        SELECT c.categoria
        FROM categorias_produto cp
        JOIN categorias c ON cp.id_categoria = c.id_categoria
        WHERE cp.id_produto = $1
        `,
      [idProduto]
    );

    return responder(res, {
      dados: result.rows,
      mensagem: `Categorias do produto ${idProduto} carregadas.`,
    });
  } catch (error) {
    console.error("Erro ao buscar categorias do produto:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro ao buscar categorias do produto.",
    });
  }
});

module.exports = router;
