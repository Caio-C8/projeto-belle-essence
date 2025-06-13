const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const { buscarTodosPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.get("/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const pedidosUsuario = await buscarTodosPorColuna(
      "pedidos",
      "id_cliente",
      idUsuario
    );

    const pedidosCompletos = await Promise.all(
      pedidosUsuario.map(async (pedido) => {
        const itensPedido = await buscarTodosPorColuna(
          "itens_pedido",
          "id_pedido",
          pedido.id_pedido
        );

        const itensComProduto = await Promise.all(
          itensPedido.map(async (item) => {
            const produtoQuery = `SELECT nome, marca, imagem FROM produtos WHERE id_produto = $1`;
            const produtoPedido = await pool.query(produtoQuery, [
              item.id_produto,
            ]);

            return {
              ...item,
              produto: produtoPedido.rows[0] || {},
            };
          })
        );

        return {
          ...pedido,
          itens_pedido: itensComProduto,
        };
      })
    );

    return responder(res, {
      dados: pedidosCompletos,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
