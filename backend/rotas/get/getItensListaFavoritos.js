const express = require("express");
const { buscarPorColuna, buscarTodosPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const listaFavoritosCliente = await buscarPorColuna(
      "listas_favoritos",
      "id_cliente",
      id
    );

    const itensListaFavoritos = await buscarTodosPorColuna(
      "itens_lista_favoritos",
      "id_lista_favoritos",
      listaFavoritosCliente.id_lista_favoritos
    );

    return responder(res, {
      dados: itensListaFavoritos,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
