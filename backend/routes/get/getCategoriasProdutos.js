const express = require("express");
const router = express.Router();
const {
  listarTodos,
  listarProdutosCategorias,
  listarProdutosCategoriasPorId,
} = require("../../db/controladores");

router.get(
  "/categorias-produtos",
  listarTodos("categorias_produtos", "id_produto")
);
router.get("/", listarProdutosCategorias());
router.get("/:id", listarProdutosCategoriasPorId());

module.exports = router;
