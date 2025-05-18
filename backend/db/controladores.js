const {
  buscarTodos,
  buscarPorColuna,
  buscarTodosPorColuna,
} = require("./queries");
const pool = require("../connect");
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

const listarProdutosCategorias = () => {
  return async (req, res) => {
    try {
      const query = `
        SELECT 
          p.id_produto,
          p.nome,
          c.categoria
        FROM categorias_produto cp
        JOIN produtos p ON cp.id_produto = p.id_produto
        JOIN categorias c ON cp.id_categoria = c.id_categoria
        ORDER BY p.id_produto;
      `;

      const result = await pool.query(query);

      const agrupado = result.rows.reduce((acc, row) => {
        const existente = acc.find((p) => p.id_produto === row.id_produto);
        if (existente) {
          existente.categorias.push(row.categoria);
        } else {
          acc.push({
            id_produto: row.id_produto,
            nome: row.nome,
            categorias: [row.categoria],
          });
        }
        return acc;
      }, []);

      return responder(res, {
        mensagem: "Produtos com categorias listados.",
        dados: agrupado,
      });
    } catch (error) {
      console.error("Erro ao buscar produtos com categorias:", error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const listarProdutosCategoriasPorId = () => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const query = `
        SELECT 
          p.id_produto,
          p.nome,
          c.categoria
        FROM categorias_produto cp
        JOIN produtos p ON cp.id_produto = p.id_produto
        JOIN categorias c ON cp.id_categoria = c.id_categoria
        WHERE p.id_produto = $1
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return responder(res, {
          status: 404,
          sucesso: false,
          mensagem: "Produto não encontrado",
        });
      }

      const categorias = result.rows.map((row) => row.categoria);

      const produto = {
        id_produto: result.rows[0].id_produto,
        nome: result.rows[0].nome,
        categorias,
      };

      return responder(res, {
        mensagem: "Produto com categorias encontrado.",
        dados: produto,
      });
    } catch (error) {
      console.error("Erro ao buscar produto por ID com categorias:", error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const listarProdutosOcasioes = () => {
  return async (req, res) => {
    try {
      const query = `
        SELECT 
          p.id_produto,
          p.nome,
          o.ocasiao
        FROM ocasioes_produto op
        JOIN produtos p ON op.id_produto = p.id_produto
        JOIN ocasioes o ON op.id_ocasiao = o.id_ocasiao
        ORDER BY p.id_produto;
      `;

      const result = await pool.query(query);

      const agrupado = result.rows.reduce((acc, row) => {
        const existente = acc.find((p) => p.id_produto === row.id_produto);
        if (existente) {
          existente.ocasioes.push(row.ocasiao);
        } else {
          acc.push({
            id_produto: row.id_produto,
            nome: row.nome,
            ocasioes: [row.ocasiao],
          });
        }
        return acc;
      }, []);

      return responder(res, {
        mensagem: "Produtos com ocasiões listados.",
        dados: agrupado,
      });
    } catch (error) {
      console.error("Erro ao buscar produtos com ocasiões:", error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

const listarProdutosOcasioesPorId = () => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const query = `
        SELECT 
          p.id_produto,
          p.nome,
          o.ocasiao
        FROM ocasioes_produto op
        JOIN produtos p ON op.id_produto = p.id_produto
        JOIN ocasioes o ON op.id_ocasiao = o.id_ocasiao
        WHERE p.id_produto = $1
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return responder(res, {
          status: 404,
          sucesso: false,
          mensagem: "Produto não encontrado",
        });
      }

      const ocasioes = result.rows.map((row) => row.ocasiao);

      const produto = {
        id_produto: result.rows[0].id_produto,
        nome: result.rows[0].nome,
        ocasioes,
      };

      return responder(res, {
        mensagem: "Produto com ocasiões encontrado.",
        dados: produto,
      });
    } catch (error) {
      console.error("Erro ao buscar produto por ID com ocasiões:", error);
      return responder(res, {
        status: 500,
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  };
};

module.exports = {
  listarTodos,
  listarPorId,
  listarUnicoPorUsuario,
  listarProdutosCategorias,
  listarProdutosCategoriasPorId,
  listarProdutosOcasioes,
  listarProdutosOcasioesPorId,
  listarTodosPorId,
};
