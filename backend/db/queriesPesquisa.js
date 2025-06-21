const pool = require("../connect");
const { buscarPorColuna, buscarTodosPorColuna } = require("./queries");
const {
  montarFiltrosQuery,
  aplicarFiltros,
} = require("../utilidades/montarFiltros");
const responder = require("../utilidades/responder");

const buscarProdutoPorCodigo = async (codigoProduto, tipoUsuario = null) => {
  const produto = await buscarPorColuna(
    "produtos",
    "codigo_produto",
    codigoProduto
  );

  if (tipoUsuario !== "admin" && produto && produto.ativo === false)
    return null;

  return produto;
};

const buscarProdutosPorTermos = async (
  termos,
  filtros = {},
  tipoUsuario = null
) => {
  const valores = termos.map((t) => `%${t}%`);

  const likeConditions = termos
    .map((_, index) => {
      const pos = index + 1;
      return `
        (
          unaccent(lower(nome)) LIKE $${pos}
          OR unaccent(lower(descricao)) LIKE $${pos}
          OR unaccent(lower(marca)) LIKE $${pos}
          OR unaccent(lower(familia_olfativa)) LIKE $${pos}
          OR unaccent(lower(concentracao)) LIKE $${pos}
          OR EXISTS (
            SELECT 1 FROM categorias_produto cp
            JOIN categorias c ON cp.id_categoria = c.id_categoria
            WHERE cp.id_produto = p.id_produto AND unaccent(lower(c.categoria)) LIKE $${pos}
          )
          OR EXISTS (
            SELECT 1 FROM ocasioes_produto op
            JOIN ocasioes o ON op.id_ocasiao = o.id_ocasiao
            WHERE op.id_produto = p.id_produto AND unaccent(lower(o.ocasiao)) LIKE $${pos}
          )
        )
      `;
    })
    .join(" OR ");

  let baseQuery = `
    SELECT *
    FROM produtos p
    WHERE (${likeConditions})
  `;

  if (tipoUsuario !== "admin") {
    baseQuery += " AND p.ativo = true";
  }

  const { query, params } = aplicarFiltros(
    baseQuery,
    filtros,
    valores.length + 1
  );
  const finalParams = [...valores, ...params];

  const result = await pool.query(
    query + " ORDER BY promocao DESC, id_produto ASC",
    finalParams
  );
  return result.rows;
};

const buscarProdutosRelacionados = async (idProduto, tipoUsuario = null) => {
  const categoriasResult = await pool.query(
    `
      SELECT id_categoria
      FROM categorias_produto
      WHERE id_produto = $1
    `,
    [idProduto]
  );

  if (categoriasResult.rowCount === 0) {
    return [];
  }

  const idsCategorias = categoriasResult.rows.map((row) => row.id_categoria);

  let query = `
      SELECT DISTINCT p.*
      FROM produtos p
      JOIN categorias_produto cp ON p.id_produto = cp.id_produto
      WHERE cp.id_categoria = ANY($1::int[])
      AND p.id_produto != $2      
    `;

  if (tipoUsuario !== "admin") {
    query += " AND p.ativo = true";
  }

  query += ` ORDER BY p.promocao DESC, p.id_produto ASC`;

  const relacionadosResult = await pool.query(query, [
    idsCategorias,
    idProduto,
  ]);

  return relacionadosResult.rows;
};

const buscarProdutosPorCategoriaSlug = async (
  categoriaSlug,
  filtros = {},
  tipoUsuario = null
) => {
  if (categoriaSlug === "promocoes") {
    let baseQuery = "SELECT * FROM produtos WHERE promocao = TRUE";

    if (tipoUsuario !== "admin") {
      baseQuery += " AND ativo = TRUE";
    }

    const { query, params } = aplicarFiltros(baseQuery, filtros);
    const result = await pool.query(
      query + " ORDER BY promocao DESC, id_produto ASC",
      params
    );
    return {
      produtos: result.rows,
      mensagem: `Foram encontrados ${result.rowCount} produtos em promoção.`,
    };
  }
  if (categoriaSlug === "lancamentos") {
    let baseQuery = "SELECT * FROM produtos WHERE lancamento = TRUE";

    if (tipoUsuario !== "admin") {
      baseQuery += " AND ativo = TRUE";
    }

    const { query, params } = aplicarFiltros(baseQuery, filtros);
    const result = await pool.query(
      query + " ORDER BY promocao DESC, id_produto ASC",
      params
    );
    return {
      produtos: result.rows,
      mensagem: `Foram encontrados ${result.rowCount} produtos em lançamento.`,
    };
  }

  const resultCategoria = await pool.query(
    `SELECT categoria FROM categorias WHERE unaccent(lower(categoria)) = unaccent(lower($1))`,
    [categoriaSlug.replace(/-/g, " ")]
  );

  if (resultCategoria.rowCount === 0) {
    return {
      produtos: [],
      mensagem: `Categoria \'${categoriaSlug}\' não encontrada.`,
      status: 404,
    };
  }

  const nomeCategoriaBanco = resultCategoria.rows[0].categoria;

  let baseQuery = `
    SELECT p.*
    FROM produtos p
    JOIN categorias_produto cp ON p.id_produto = cp.id_produto
    JOIN categorias c ON cp.id_categoria = c.id_categoria
    WHERE unaccent(lower(c.categoria)) = unaccent(lower($1))
  `;

  if (tipoUsuario !== "admin") {
    baseQuery += " AND p.ativo = true";
  }

  const { query, params } = aplicarFiltros(baseQuery, filtros, 2);
  const finalParams = [nomeCategoriaBanco, ...params];

  const resultProdutos = await pool.query(
    query + " ORDER BY p.id_produto ASC",
    finalParams
  );

  return {
    produtos: resultProdutos.rows,
    mensagem: `Foram encontrados ${resultProdutos.rowCount} produtos na categoria "${nomeCategoriaBanco}".`,
  };
};

module.exports = {
  buscarProdutoPorCodigo,
  buscarProdutosPorTermos,
  buscarProdutosRelacionados,
  buscarProdutosPorCategoriaSlug,
};
