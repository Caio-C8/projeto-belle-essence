const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("categorias", "id_categoria"));
router.get("/:id", listarPorId("categorias", "id_categoria"));

module.exports = router;
