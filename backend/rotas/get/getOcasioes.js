const express = require("express");
const router = express.Router();
const { listarTodos, listarPorId } = require("../../db/controladores");

router.get("/", listarTodos("ocasioes", "id_ocasiao"));
router.get("/:id", listarPorId("ocasioes", "id_ocasiao"));

module.exports = router;
