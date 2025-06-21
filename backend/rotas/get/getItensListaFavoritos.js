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

    // Filtrar produtos ativos
    const ativos = [];

    for (const item of itensListaFavoritos) {
      const produto = await buscarPorColuna(
        "produtos",
        "id_produto",
        item.id_produto
      );
      if (produto && produto.ativo === true) {
        ativos.push(item);
      }
    }

    return responder(res, {
      dados: ativos,
    });
  } catch (error) {
    console.error("Erro ao carregar itens da lista de favoritos:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
