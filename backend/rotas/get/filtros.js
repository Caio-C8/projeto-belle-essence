const express = require("express");
const router = express.Router();
const responder = require("../../utilidades/responder");
const { getFiltrosDinamicos } = require("../../handlers/handlerPesquisa");

router.get("/", async (req, res) => {
  try {
    const filtrosDinamicos = await getFiltrosDinamicos();
    return responder(res, {
      dados: filtrosDinamicos,
      mensagem: "Filtros dinâmicos obtidos com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao buscar filtros dinâmicos:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao buscar filtros dinâmicos.",
    });
  }
});

module.exports = router;

