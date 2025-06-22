const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT
        p.id_pedido,
        p.data_pedido,
        p.status,

        c.nome AS nome_cliente,
        c.sobrenome AS sobrenome_cliente,
        c.email AS email_cliente,
        c.celular AS celular_cliente,

        e.cep,
        e.logradouro,
        e.numero,
        e.bairro,
        e.cidade,
        e.estado,
        e.tipo,

        ip.id_item_pedido,
        ip.qtde,
        ip.preco_unitario,
        pr.nome AS nome_produto,
        pr.imagem AS imagem_produto
      FROM pedidos p
      INNER JOIN clientes c ON p.id_cliente = c.id_cliente
      LEFT JOIN enderecos e ON p.id_endereco = e.id_endereco
      INNER JOIN itens_pedido ip ON p.id_pedido = ip.id_pedido
      INNER JOIN produtos pr ON ip.id_produto = pr.id_produto
      ORDER BY p.data_pedido DESC, p.id_pedido, ip.id_item_pedido;
    `;

    const result = await pool.query(query);

    const pedidosMap = {};

    result.rows.forEach((row) => {
      const idPedido = row.id_pedido;

      if (!pedidosMap[idPedido]) {
        pedidosMap[idPedido] = {
          id_pedido: idPedido,
          data_pedido: row.data_pedido,
          status: row.status,
          cliente: {
            nome: row.nome_cliente,
            sobrenome: row.sobrenome_cliente,
            email: row.email_cliente,
            celular: row.celular_cliente,
          },
          endereco: {
            cep: row.cep,
            logradouro: row.logradouro,
            numero: row.numero,
            bairro: row.bairro,
            cidade: row.cidade,
            estado: row.estado,
            tipo: row.tipo,
          },
          itens: [],
        };
      }

      pedidosMap[idPedido].itens.push({
        id_item_pedido: row.id_item_pedido,
        nome_produto: row.nome_produto,
        imagem_produto: row.imagem_produto,
        qtde: row.qtde,
        preco_unitario: row.preco_unitario,
      });
    });

    const pedidos = Object.values(pedidosMap);

    responder(res, {
      dados: pedidos,
      mensagem: "Lista de pedidos carregada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao listar pedidos.",
    });
  }
});

module.exports = router;
