const express = require("express");
const router = express.Router();
const { adicionarProdutoAosFavoritos } = require("../../handlers/handlerPost");

router.post("/", adicionarProdutoAosFavoritos);

module.exports = router;
