const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../handlers/handlerListar");

router.get("/", listarTodos("clientes", "id_cliente"));
router.get("/:id", listarPorId("clientes", "id_cliente"));

module.exports = router;
