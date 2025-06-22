const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.put("/:idProduto", async (req, res) => {
  console.log("passou");

  const { idProduto } = req.params;
  const {
    preco_promocao,
    data_fim_promocao,
    banner_promocao,
    descricao_promocao,
  } = req.body;

  if (!preco_promocao || !data_fim_promocao) {
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Campos obrigatórios: preco_promocao e data_fim_promocao.",
    });
  }

  try {
    const updateQuery = `
      UPDATE produtos
      SET 
        preco_promocao = $1,
        data_fim_promocao = $2,
        banner_promocao = $3,
        descricao_promocao = $4,
        promocao = true
      WHERE id_produto = $5
    `;

    const result = await pool.query(updateQuery, [
      preco_promocao,
      data_fim_promocao,
      banner_promocao || null,
      descricao_promocao || null,
      idProduto,
    ]);

    if (result.rowCount === 0) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Produto não encontrado.",
      });
    }

    responder(res, {
      mensagem: "Promoção alterada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao alterar promoção:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao alterar promoção.",
    });
  }
});

module.exports = router;
