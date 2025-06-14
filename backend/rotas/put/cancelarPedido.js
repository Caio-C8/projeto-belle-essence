const express = require("express");
const router = express.Router();
const responder = require("../../utilidades/responder");
const { atualizarColunaPorId, buscarPorColuna } = require("../../db/queries");

router.put("/", async (req, res) => {
  const { idPedido } = req.body;

  try {
    const pedido = await buscarPorColuna("pedidos", "id_pedido", idPedido);

    if (pedido.status === "Cancelado")
      return responder(res, {
        mensagem: "Pedido já está cancelado.",
      });

    await atualizarColunaPorId("pedidos", "status", "id_pedido", [
      "Cancelado",
      idPedido,
    ]);

    return responder(res, {
      mensagem:
        "Pedido foi cancelado. Para mais informações entre em contato no Whatsapp.",
    });
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao atualizar a quantidade.",
    });
  }
});

module.exports = router;
