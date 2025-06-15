const express = require("express");
const router = express.Router();
const { atualizarDadosCliente } = require("../../handlers/handlerPut");

router.put("/:id", atualizarDadosCliente);

module.exports = router;
