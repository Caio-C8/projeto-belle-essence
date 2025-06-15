const express = require("express");
const router = express.Router();
const { esvaziarCarrinhoCliente } = require("../../handlers/handlerDelete");

router.delete("/:id", esvaziarCarrinhoCliente); // idCliente

module.exports = router;
