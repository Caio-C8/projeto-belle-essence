const express = require("express");
const router = express.Router();
const { cancelarPedido } = require("../../handlers/handlerPut");

router.put("/", cancelarPedido);

module.exports = router;
