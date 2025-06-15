const express = require("express");
const router = express.Router();
const { atualizarDadosEndereco } = require("../../handlers/handlerPut");

router.put("/:id", atualizarDadosEndereco);

module.exports = router;
