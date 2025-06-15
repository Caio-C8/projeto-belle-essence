const express = require("express");
const router = express.Router();
const { realizarPedidoCliente } = require("../../handlers/handlerPost");

router.post("/", realizarPedidoCliente);

module.exports = router;
