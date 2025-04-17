const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("carrinhos", "id_carrinho"));
router.get("/:id", listarPorId("carrinhos", "id_carrinho"));

module.exports = router;
