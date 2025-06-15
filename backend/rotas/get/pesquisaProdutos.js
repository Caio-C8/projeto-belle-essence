const express = require("express");
const router = express.Router();
const { buscarTodos } = require("../../db/queries");
const responder = require("../../utilidades/responder");
const {
  pesquisarProdutos,
  pesquisarProdutosPorCategoria,
  pesquisarProdutosRelacionados,
} = require("../../handlers/handlerPesquisa");

router.get("/todos", async (req, res) => {
  try {
    const result = await buscarTodos("produtos", "id_produto");
    return responder(res, {
      dados: result,
      mensagem: `Foram encontrados ${result.length} produtos.`,
    });
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/categoria/:categoria", pesquisarProdutosPorCategoria);
router.get("/relacionados/:idProduto", pesquisarProdutosRelacionados);
router.get("/", pesquisarProdutos);

module.exports = router;
