const {
  buscarPorColuna,
  deletarItemPorColuna,
  deletarItensPorColuna,
  buscarTodosPorColuna,
  atualizarColunasPorCondicoes,
} = require("../db/queries");
const responder = require("../utilidades/responder");

const deletarPorId = (
  tabela,
  colunaId,
  mensagemSucesso,
  mensagemNaoEncontrado
) => {
  return async (req, res) => {
    const id = req.params.id;

    try {
      const registro = await buscarPorColuna(tabela, colunaId, id);

      if (!registro) {
        return responder(res, {
          status: 404,
          sucesso: false,
          mensagem: mensagemNaoEncontrado,
        });
      }

      await deletarItemPorColuna(tabela, colunaId, id);

      return responder(res, { mensagem: mensagemSucesso });
    } catch (error) {
      console.error(`Erro ao excluir ${tabela}:`, error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const deletarPorUsuarioEProduto = (
  tabelaBusca,
  campoUsuario,
  campoIdInterno,
  tabelaDelete,
  camposWhere,
  mensagemSucesso,
  mensagemNaoEncontrado
) => {
  return async (req, res) => {
    const { idUsuario, idProduto } = req.params;

    try {
      const entidade = await buscarPorColuna(
        tabelaBusca,
        campoUsuario,
        idUsuario
      );

      if (!entidade) {
        return responder(res, {
          status: 404,
          sucesso: false,
          mensagem: mensagemNaoEncontrado,
        });
      }

      const condicoes = {
        [camposWhere.idReferencia]: entidade[campoIdInterno],
        [camposWhere.idProduto]: idProduto,
      };

      await deletarItensPorColuna(tabelaDelete, condicoes);

      return responder(res, { mensagem: mensagemSucesso });
    } catch (error) {
      console.error(`Erro ao excluir item em ${tabelaDelete}:`, error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const esvaziarCarrinhoCliente = async (req, res) => {
  const idCliente = req.params.id;

  try {
    const carrinho = await buscarPorColuna(
      "carrinhos",
      "id_cliente",
      idCliente
    );

    if (!carrinho) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Carrinho não encontrado.",
      });
    }

    await deletarItensPorColuna("itens_carrinho", {
      id_carrinho: carrinho.id_carrinho,
    });

    return responder(res, { mensagem: "Carrinho esvaziado com sucesso." });
  } catch (error) {
    console.error("Erro ao esvaziar carrinho:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro ao esvaziar carrinho no servidor.",
    });
  }
};

const deletarEndereco = async (req, res) => {
  const idEndereco = req.params.id;

  try {
    const endereco = await buscarPorColuna(
      "enderecos",
      "id_endereco",
      idEndereco
    );

    if (!endereco)
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Endereço não encontrado.",
      });

    const pedidos = await buscarTodosPorColuna(
      "pedidos",
      "id_endereco",
      idEndereco
    );

    const pedidosNaoPermitidos = pedidos.filter(
      (pedido) => pedido.status !== "Entregue" && pedido.status !== "Cancelado"
    );

    if (pedidosNaoPermitidos.length > 0) {
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem:
          "Este endereço está em um pedido em andamento. Cancele ou aguarde a entrega para excluir.",
      });
    }

    if (pedidos.length > 0) {
      await atualizarColunasPorCondicoes(
        "pedidos",
        { id_endereco: idEndereco },
        { id_endereco: null }
      );
    }

    await deletarItemPorColuna("enderecos", "id_endereco", idEndereco);

    return responder(res, {
      mensagem: "Endereço excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

module.exports = {
  deletarPorId,
  deletarPorUsuarioEProduto,
  esvaziarCarrinhoCliente,
  deletarEndereco,
};
