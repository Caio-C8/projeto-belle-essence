const express = require("express");
const router = express.Router();
const { deletarItensPorColuna, buscarPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.delete("/:idUsuario/:idProduto", async (req, res) => {
  const { idUsuario, idProduto } = req.params;

  try {
    const listaFavoritosCliente = await buscarPorColuna(
      "listas_favoritos",
      "id_cliente",
      idUsuario
    );

    if (!listaFavoritosCliente) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Lista de favoritos não encontrada.",
      });
    }

    await deletarItensPorColuna("itens_lista_favoritos", {
      id_lista_favoritos: listaFavoritosCliente.id_lista_favoritos,
      id_produto: idProduto,
    });

    return responder(res, {
      mensagem: "Produto removido da lista de favoritos.",
    });
  } catch (error) {
    console.error("Erro ao remover dos favoritos:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
