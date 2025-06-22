const express = require("express");
const router = express.Router();
const responder = require("../../utilidades/responder");
const {
  pesquisarProdutos,
  pesquisarProdutosPorCategoria,
  pesquisarProdutosRelacionados,
} = require("../../handlers/handlerPesquisa");
const { buscarProdutoPorCodigo } = require("../../db/queriesPesquisa");

router.get("/todos", async (req, res) => {
  try {
    const { marca, familia_olfativa, concentracao, preco, tipoUsuario } =
      req.query;
    const filtros = { marca, familia_olfativa, concentracao, preco };

    const resultado = await pesquisarProdutos(
      req,
      res,
      true,
      filtros,
      tipoUsuario
    );

    return responder(res, {
      dados: resultado.dados,
      mensagem: resultado.mensagem,
    });
  } catch (error) {
    console.error("Erro ao buscar todos os produtos com filtros:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/categoria/:categoria", async (req, res) => {
  try {
    const { marca, familia_olfativa, concentracao, preco, tipoUsuario } =
      req.query;
    const filtros = { marca, familia_olfativa, concentracao, preco };

    const resultado = await pesquisarProdutosPorCategoria(
      req,
      res,
      filtros,
      tipoUsuario
    );

    return responder(res, {
      status: resultado.status || 200,
      sucesso: resultado.sucesso,
      dados: resultado.dados,
      mensagem: resultado.mensagem,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria com filtros:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/relacionados/:idProduto", pesquisarProdutosRelacionados);

router.get("/", async (req, res) => {
  try {
    const { marca, familia_olfativa, concentracao, preco, tipoUsuario } =
      req.query;
    const filtros = { marca, familia_olfativa, concentracao, preco };

    const resultado = await pesquisarProdutos(
      req,
      res,
      false,
      filtros,
      tipoUsuario
    );

    return responder(res, {
      dados: resultado.dados,
      mensagem: resultado.mensagem,
    });
  } catch (error) {
    console.error("Erro na pesquisa com filtros:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/codigo/:codigoProduto", async (req, res) => {
  const { codigoProduto } = req.params;

  try {
    const produto = await buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Produto não encontrado.",
      });
    }

    return responder(res, { dados: produto });
  } catch (error) {
    console.error("Erro ao buscar produto por código:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro ao buscar produto por código.",
    });
  }
});

module.exports = router;
