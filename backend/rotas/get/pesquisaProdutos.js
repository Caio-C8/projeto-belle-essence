const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const responder = require("../../utilidades/responder");
const { buscarTodos, buscarTodosPorColuna } = require("../../db/queries");

const preposicoes = [
  "de",
  "da",
  "do",
  "das",
  "dos",
  "a",
  "o",
  "os",
  "as",
  "com",
  "em",
  "para",
  "por",
  "e",
];

const normalizarTexto = (texto) => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

router.get("/todos", async (req, res) => {
  try {
    const result = await buscarTodos("produtos", "id_produto");

    return responder(res, {
      dados: result,
      mensagem: `Foram encontrados ${result.length} produtos.`,
    });
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/categoria/:categoria", async (req, res) => {
  const { categoria } = req.params;

  try {
    if (categoria === "promocoes") {
      const produtosPromocao = await buscarTodosPorColuna(
        "produtos",
        "promocao",
        true
      );

      return responder(res, {
        dados: produtosPromocao,
        mensagem: `Foram encontrados ${produtosPromocao.length} produtos em promoção.`,
      });
    }

    if (categoria === "lancamentos") {
      const produtosLancamento = await buscarTodosPorColuna(
        "produtos",
        "lancamento",
        true
      );

      return responder(res, {
        dados: produtosLancamento,
        mensagem: `Foram encontrados ${produtosLancamento.length} produtos em lançamento.`,
      });
    }

    // Busca a categoria no banco comparando slug normalizado
    const resultCategoria = await pool.query(
      `SELECT categoria FROM categorias WHERE unaccent(lower(categoria)) = unaccent(lower($1))`,
      [categoria.replace(/-/g, " ")]
    );

    if (resultCategoria.rowCount === 0) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: `Categoria '${categoria}' não encontrada.`,
      });
    }

    const nomeCategoriaBanco = resultCategoria.rows[0].categoria;

    const query = `
        SELECT p.*
        FROM produtos p
        JOIN categorias_produto cp ON p.id_produto = cp.id_produto
        JOIN categorias c ON cp.id_categoria = c.id_categoria
        WHERE unaccent(lower(c.categoria)) = unaccent(lower($1))
        ORDER BY p.id_produto ASC
      `;
    const resultProdutos = await pool.query(query, [nomeCategoriaBanco]);

    return responder(res, {
      dados: resultProdutos.rows,
      mensagem: `Foram encontrados ${resultProdutos.rowCount} produtos na categoria "${nomeCategoriaBanco}".`,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

router.get("/relacionados/:idProduto", async (req, res) => {
  const { idProduto } = req.params;

  try {
    const categoriasResult = await pool.query(
      `
        SELECT id_categoria
        FROM categorias_produto
        WHERE id_produto = $1
     `,
      [idProduto]
    );

    if (categoriasResult.rowCount === 0) {
      return responder(res, {
        dados: [],
        mensagem: "Produto não tem categorias para buscar relacionados.",
      });
    }

    const idsCategorias = categoriasResult.rows.map((row) => row.id_categoria);

    const query = `
        SELECT DISTINCT p.*
        FROM produtos p
        JOIN categorias_produto cp ON p.id_produto = cp.id_produto
        WHERE cp.id_categoria = ANY($1::int[])
        AND p.id_produto != $2
        ORDER BY p.promocao DESC, p.id_produto ASC
      `;

    const relacionadosResult = await pool.query(query, [
      idsCategorias,
      idProduto,
    ]);

    return responder(res, {
      dados: relacionadosResult.rows,
      mensagem: `Foram encontrados ${relacionadosResult.rowCount} produtos relacionados.`,
    });
  } catch (error) {
    console.error("Erro ao buscar relacionados:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao buscar relacionados.",
    });
  }
});

router.get("/", async (req, res) => {
  const { pesq } = req.query;
  if (!pesq) {
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Parâmetro 'pesq' obrigatório.",
    });
  }

  try {
    const termosOriginais = pesq.split(" ").filter(Boolean);
    const termosFiltrados = termosOriginais
      .map(normalizarTexto)
      .filter((palavra) => palavra && !preposicoes.includes(palavra));

    if (termosFiltrados.length === 0)
      termosFiltrados.push(normalizarTexto(pesq));

    const valores = termosFiltrados.map((t) => `%${t}%`);
    const likeConditions = termosFiltrados
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

    const query = `
        SELECT *
        FROM produtos p
        WHERE ${likeConditions}
        ORDER BY promocao DESC, id_produto ASC
      `;

    const result = await pool.query(query, valores);

    return responder(res, {
      dados: result.rows,
      mensagem: `Foram encontrados ${result.rowCount} produtos para a pesquisa.`,
    });
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
