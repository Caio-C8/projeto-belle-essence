const express = require("express");
const router = express.Router();
const { adicionarProdutoAoCarrinho } = require("../../handlers/handlerPost");

router.post("/", adicionarProdutoAoCarrinho);

module.exports = router;
