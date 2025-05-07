const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("enderecos", "id_endereco"));
router.get("/:id", listarPorId("enderecos", "id_cliente"));

module.exports = router;
