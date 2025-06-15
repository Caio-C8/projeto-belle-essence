const {
  buscarTodos,
  buscarPorColuna,
  buscarTodosPorColuna,
} = require("../db/queries");
const responder = require("../utilidades/responder");

const listarTodos = (tabela, ordem) => {
  return async (req, res) => {
    try {
      const resultado = await buscarTodos(tabela, ordem);
      return responder(res, {
        mensagem: "Dados encontrados.",
        dados: resultado,
      });
    } catch (error) {
      console.error(`Erro ao buscar registros de ${tabela}:`, error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const listarTodosPorId = (tabela, colunaId) => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const resultado = await buscarTodosPorColuna(tabela, colunaId, id);
      return responder(res, {
        mensagem: "Dados encontrados.",
        dados: resultado,
      });
    } catch (error) {
      console.error(`Erro ao buscar registros de ${tabela}:`, error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const listarPorId = (tabela, colunaId) => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const resultado = await buscarPorColuna(tabela, colunaId, id);

      if (!resultado) {
        return responder(res, {
          status: 404,
          sucesso: false,
          mensagem: `${tabela.slice(0, -1)} não encontrado`,
        });
      }

      return responder(res, {
        mensagem: "Registro encontrado.",
        dados: resultado,
      });
    } catch (error) {
      console.error(`Erro ao buscar ${tabela} por ID:`, error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const listarUnicoPorUsuario = (tabela, colunaUsuario) => {
  return async (req, res) => {
    const idUsuario = req.usuario.id;

    try {
      const resultado = await buscarTodosPorColuna(
        tabela,
        colunaUsuario,
        idUsuario
      );

      if (resultado.length === 0) {
        return responder(res, {
          status: 404,
          sucesso: false,
          mensagem: `${tabela} não encontrado.`,
        });
      }

      return responder(res, {
        mensagem: "Registro encontrado.",
        dados: resultado[0],
      });
    } catch (error) {
      console.error(`Erro ao buscar ${tabela}:`, error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor.",
      });
    }
  };
};

module.exports = {
  listarTodos,
  listarPorId,
  listarUnicoPorUsuario,
  listarTodosPorId,
};
