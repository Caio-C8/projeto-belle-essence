const express = require("express");
const router = express.Router();
const { atualizarQuantidadeCarrinho } = require("../../handlers/handlerPut");

router.put("/", atualizarQuantidadeCarrinho);

module.exports = router;
