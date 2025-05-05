const express = require("express");
const router = express.Router();
const {
  listarTodos,
  listarProdutosOcasioes,
  listarProdutosOcasioesPorId,
} = require("../../db/controladores");

router.get(
  "/ocasioes-produtos",
  listarTodos("ocasioes_produtos", "id_produto")
);
router.get("/", listarProdutosOcasioes());
router.get("/:id", listarProdutosOcasioesPorId());

module.exports = router;
