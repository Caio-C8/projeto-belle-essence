const express = require("express");
const router = express.Router();
const responder = require("../../utilidades/responder");
const {
  pesquisarProdutos,
  pesquisarProdutosPorCategoria,
  pesquisarProdutosRelacionados,
  getFiltrosDinamicos,
} = require("../../handlers/handlerPesquisa");

router.get("/todos", async (req, res) => {
  try {
    const resultado = await pesquisarProdutos(req, res, true);
    const filtrosDinamicos = await getFiltrosDinamicos();

    return responder(res, {
      status: resultado.status,
      sucesso: resultado.sucesso,
      dados: resultado.dados,
      filtros: filtrosDinamicos,
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
    const resultado = await pesquisarProdutosPorCategoria(req, res);
    const filtrosDinamicos = await getFiltrosDinamicos();

    return responder(res, {
      status: resultado.status,
      sucesso: resultado.sucesso,
      dados: resultado.dados,
      filtros: filtrosDinamicos,
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

router.get("/relacionados/:idProduto", async (req, res) => {
  try {
    const resultado = await pesquisarProdutosRelacionados(req, res);
    const filtrosDinamicos = await getFiltrosDinamicos();

    return responder(res, {
      status: resultado.status,
      sucesso: resultado.sucesso,
      dados: resultado.dados,
      filtros: filtrosDinamicos,
      mensagem: resultado.mensagem,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos relacionados:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const resultado = await pesquisarProdutos(req, res, false);
    const filtrosDinamicos = await getFiltrosDinamicos();

    return responder(res, {
      status: resultado.status,
      sucesso: resultado.sucesso,
      dados: resultado.dados,
      filtros: filtrosDinamicos,
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

module.exports = router;
