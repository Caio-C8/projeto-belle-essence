const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("listas_favoritos", "id_lista_favoritos"));
router.get("/:id", listarPorId("listas_favoritos", "id_lista_favoritos"));

module.exports = router;
