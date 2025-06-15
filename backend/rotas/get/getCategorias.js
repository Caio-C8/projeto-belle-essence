const express = require("express");
const router = express.Router();
const { listarTodos } = require("../../handlers/handlerListar");

router.get("/", listarTodos("categorias", "id_categoria"));

module.exports = router;
