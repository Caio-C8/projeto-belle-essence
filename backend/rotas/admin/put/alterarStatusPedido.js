const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.put("/:idPedido", async (req, res) => {
  const { idPedido } = req.params;
  const { status } = req.body;

  if (!status || typeof status !== "string" || status.trim() === "") {
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Campo 'status' é obrigatório e deve ser uma string válida.",
    });
  }

  try {
    const query = `
      UPDATE pedidos
      SET status = $1
      WHERE id_pedido = $2
    `;

    const result = await pool.query(query, [status, idPedido]);

    if (result.rowCount === 0) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Pedido não encontrado.",
      });
    }

    responder(res, {
      mensagem: "Status do pedido atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao alterar status do pedido:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao alterar status do pedido.",
    });
  }
});

module.exports = router;
