const express = require("express");
const router = express.Router();
const { deletarPorUsuarioEProduto } = require("../../handlers/handlerDelete");

router.delete(
  "/:idUsuario/:idProduto",
  deletarPorUsuarioEProduto(
    "carrinhos",
    "id_cliente",
    "id_carrinho",
    "itens_carrinho",
    { idReferencia: "id_carrinho", idProduto: "id_produto" },
    "Produto removido da sacola.",
    "Sacola não encontrada."
  )
);

module.exports = router;
