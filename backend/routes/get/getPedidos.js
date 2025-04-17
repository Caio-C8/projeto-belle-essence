const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("pedidos", "id_pedido"));
router.get("/:id", listarPorId("pedidos", "id_pedido"));

module.exports = router;
