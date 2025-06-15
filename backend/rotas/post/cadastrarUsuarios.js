const express = require("express");
const router = express.Router();
const { cadastrarNovoUsuario } = require("../../handlers/handlerPost");

router.post("/", cadastrarNovoUsuario);

module.exports = router;
