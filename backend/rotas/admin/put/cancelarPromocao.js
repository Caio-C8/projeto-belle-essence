// /rotas/admin/put/cancelarPromocao.js

const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.put("/:idProduto", async (req, res) => {
  const { idProduto } = req.params;

  try {
    const updateQuery = `
      UPDATE produtos
      SET 
        preco_promocao = NULL,
        data_fim_promocao = NULL,
        banner_promocao = NULL,
        descricao_promocao = NULL,
        promocao = FALSE
      WHERE id_produto = $1
    `;

    const result = await pool.query(updateQuery, [idProduto]);

    if (result.rowCount === 0) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Produto não encontrado.",
      });
    }

    responder(res, {
      mensagem: "Promoção cancelada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao cancelar promoção:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao cancelar promoção.",
    });
  }
});

module.exports = router;
