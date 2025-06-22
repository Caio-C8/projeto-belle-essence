const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.post("/", async (req, res) => {
  try {
    const {
      codigo_produto,
      preco_promocao,
      data_fim_promocao,
      banner_promocao,
      descricao_promocao,
    } = req.body;

    if (!codigo_produto || !preco_promocao || !data_fim_promocao) {
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem:
          "Campos obrigatórios: codigo_produto, preco_promocao e data_fim_promocao.",
      });
    }

    const updateQuery = `
      UPDATE produtos
      SET 
        preco_promocao = $1,
        data_fim_promocao = $2,
        banner_promocao = $3,
        descricao_promocao = $4,
        promocao = true
      WHERE codigo_produto = $5
    `;

    const result = await pool.query(updateQuery, [
      preco_promocao,
      data_fim_promocao,
      banner_promocao || null,
      descricao_promocao || null,
      codigo_produto,
    ]);

    if (result.rowCount === 0) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Produto não encontrado.",
      });
    }

    responder(res, {
      mensagem: "Promoção cadastrada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao cadastrar promoção:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao cadastrar promoção.",
    });
  }
});

module.exports = router;
