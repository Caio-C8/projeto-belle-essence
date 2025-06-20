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

router.get("/:id/categorias-ocasioes", async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar categorias
    const categoriasQuery = await pool.query(
      `
      SELECT c.categoria
      FROM categorias c
      JOIN categorias_produto cp ON cp.id_categoria = c.id_categoria
      WHERE cp.id_produto = $1
      `,
      [id]
    );

    const categorias = categoriasQuery.rows.map((row) => row.categoria);

    // Buscar ocasiões
    const ocasioesQuery = await pool.query(
      `
      SELECT o.ocasiao
      FROM ocasioes o
      JOIN ocasioes_produto op ON op.id_ocasiao = o.id_ocasiao
      WHERE op.id_produto = $1
      `,
      [id]
    );

    const ocasioes = ocasioesQuery.rows.map((row) => row.ocasiao);

    responder(res, {
      dados: { categorias, ocasioes },
    });
  } catch (error) {
    console.error("Erro ao buscar categorias/ocasiões:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao buscar categorias e ocasiões.",
    });
  }
});

module.exports = router;

module.exports = router;
