const { buscarTodos, buscarPorId } = require("./queries");
const pool = require("../connect");

const listarTodos = (tabela, ordem) => {
  return async (req, res) => {
    try {
      const resultado = await buscarTodos(tabela, ordem);
      res.json(resultado);
    } catch (error) {
      console.error(`Erro ao buscar registros de ${tabela}:`, error);
      res.status(500).send("Erro no servidor");
    }
  };
};

const listarPorId = (tabela, colunaId) => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const resultado = await buscarPorId(tabela, colunaId, id);

      if (!resultado) {
        return res.status(404).send(`${tabela.slice(0, -1)} não encontrado`);
      }

      res.json(resultado);
    } catch (error) {
      console.error(`Erro ao buscar ${tabela} por ID:`, error);
      res.status(500).send("Erro no servidor");
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

      res.json(agrupado);
    } catch (error) {
      console.error("Erro ao buscar produtos com categorias:", error);
      res.status(500).send("Erro no servidor");
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
        return res.status(404).send("Produto não encontrado");
      }

      const categorias = result.rows.map((row) => row.categoria);

      const produto = {
        id_produto: result.rows[0].id_produto,
        nome: result.rows[0].nome,
        categorias,
      };

      res.json(produto);
    } catch (error) {
      console.error("Erro ao buscar produto por ID com categorias:", error);
      res.status(500).send("Erro no servidor");
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

      res.json(agrupado);
    } catch (error) {
      console.error("Erro ao buscar produtos com ocasiões:", error);
      res.status(500).send("Erro no servidor");
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
        return res.status(404).send("Produto não encontrado");
      }

      const ocasioes = result.rows.map((row) => row.ocasiao);

      const produto = {
        id_produto: result.rows[0].id_produto,
        nome: result.rows[0].nome,
        ocasioes,
      };

      res.json(produto);
    } catch (error) {
      console.error("Erro ao buscar produto por ID com ocasiões:", error);
      res.status(500).send("Erro no servidor");
    }
  };
};

module.exports = {
  listarTodos,
  listarPorId,
  listarProdutosCategorias,
  listarProdutosCategoriasPorId,
  listarProdutosOcasioes,
  listarProdutosOcasioesPorId,
};
