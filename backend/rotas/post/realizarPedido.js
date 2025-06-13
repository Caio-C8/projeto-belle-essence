const express = require("express");
const router = express.Router();
const responder = require("../../utilidades/responder");
const { inserirRegistro } = require("../../db/queries");

router.post("/", async (req, res) => {
  const { idUsuario, idEndereco, idCarrinho, produtosPedido } = req.body;

  if (!idEndereco)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Selecione um endereço para entrega.",
    });

  try {
    const pedidoResutl = await inserirRegistro("pedidos", {
      id_cliente: idUsuario,
      id_endereco: idEndereco,
      id_carrinho: idCarrinho,
      data_pedido: new Date(),
      status: "Realizado",
    });

    const idPedido = pedidoResutl.id_pedido;

    for (const item of produtosPedido) {
      const { idProduto, qtde, precoUnitario } = item;
      await inserirRegistro("itens_pedido", {
        id_pedido: idPedido,
        id_produto: idProduto,
        qtde: qtde,
        preco_unitario: precoUnitario,
      });
    }

    return responder(res, {
      mensagem:
        "O seu pedido foi registrado com sucesso. Para ver seus pedidos, confira seu perfil.",
    });
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
