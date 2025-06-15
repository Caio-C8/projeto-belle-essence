const express = require("express");
const router = express.Router();
const { deletarPorUsuarioEProduto } = require("../../handlers/handlerDelete");

router.delete(
  "/:idUsuario/:idProduto",
  deletarPorUsuarioEProduto(
    "listas_favoritos",
    "id_cliente",
    "id_lista_favoritos",
    "itens_lista_favoritos",
    { idReferencia: "id_lista_favoritos", idProduto: "id_produto" },
    "Produto removido da lista de favoritos.",
    "Lista de favoritos não encontrada."
  )
);

module.exports = router;
