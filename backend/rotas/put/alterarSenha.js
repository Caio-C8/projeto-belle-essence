const express = require("express");
const router = express.Router();
const { alterarSenha } = require("../../handlers/handlerPut");

router.put("/", alterarSenha);

module.exports = router;
