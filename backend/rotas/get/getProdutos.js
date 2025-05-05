const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("produtos", "id_produto"));
router.get("/:id", listarPorId("produtos", "id_produto"));

module.exports = router;
