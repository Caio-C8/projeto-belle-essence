const express = require("express");
const router = express.Router();
const { buscarPorColuna, inserirRegistro } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.post("/", async (req, res) => {
  const { idProduto, idUsuario } = req.body;

  try {
    const listaFavoritosCliente = await buscarPorColuna(
      "listas_favoritos",
      "id_cliente",
      idUsuario
    );

    await inserirRegistro("itens_lista_favoritos", {
      id_lista_favoritos: listaFavoritosCliente.id_lista_favoritos,
      id_produto: idProduto,
      data_adicionado: new Date(),
    });

    return responder(res, {
      mensagem: "Produto adicionado na lista de favoritos.",
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
