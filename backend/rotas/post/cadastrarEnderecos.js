const express = require("express");
const router = express.Router();
const { cadastrarEnderecoCliente } = require("../../handlers/handlerPost");

router.post("/", cadastrarEnderecoCliente);

module.exports = router;
