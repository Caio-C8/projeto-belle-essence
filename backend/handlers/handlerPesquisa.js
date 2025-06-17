const responder = require("../utilidades/responder");
const normalizarTexto = require("../utilidades/normalizarTexto");
const pool = require("../connect");
const { montarFiltrosQuery } = require("../utilidades/montarFiltros");
const {
  buscarProdutoPorCodigo,
  buscarProdutosPorTermos,
  buscarProdutosRelacionados,
  buscarProdutosPorCategoriaSlug,
} = require("../db/queriesPesquisa");

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

const getFiltrosDinamicos = async () => {
  const marcasResult = await pool.query(
    "SELECT DISTINCT marca FROM produtos WHERE marca IS NOT NULL ORDER BY marca ASC"
  );
  const familiasResult = await pool.query(
    "SELECT DISTINCT familia_olfativa FROM produtos WHERE familia_olfativa IS NOT NULL ORDER BY familia_olfativa ASC"
  );
  const concentracoesResult = await pool.query(
    "SELECT DISTINCT concentracao FROM produtos WHERE concentracao IS NOT NULL ORDER BY concentracao ASC"
  );

  const faixasPreco = [
    { slug: "ate-50", label: "Até R$50" },
    { slug: "50-100", label: "R$50 a R$100" },
    { slug: "100-150", label: "R$100 a R$150" },
    { slug: "150-200", label: "R$150 a R$200" },
    { slug: "200-250", label: "R$200 a R$250" },
    { slug: "acima-250", label: "Acima de R$250" },
  ];

  return {
    marcas: marcasResult.rows.map((r) => r.marca),
    familias_olfativas: familiasResult.rows.map((r) => r.familia_olfativa),
    concentracoes: concentracoesResult.rows.map((r) => r.concentracao),
    faixas_preco: faixasPreco,
  };
};

const pesquisarProdutos = async (req, res, isTodosRoute = false, filtros = {}) => {
  const { pesq } = req.query;

  if (!isTodosRoute && !pesq) {
    return {
      dados: [],
      mensagem: "Parâmetro 'pesq' obrigatório.",
      status: 400,
      sucesso: false,
    };
  }

  try {
    if (!isTodosRoute) {
      const produtoPorCodigo = await buscarProdutoPorCodigo(pesq);
      if (produtoPorCodigo) {
        return {
          dados: [produtoPorCodigo],
          mensagem: `Produto com código '${pesq}' encontrado.`,
          status: 200,
          sucesso: true,
        };
      }
    }

    let produtos;
    if (isTodosRoute) {
      // Para a rota /todos, buscar todos os produtos e aplicar filtros
      const { conditions, params } = montarFiltrosQuery(filtros);
      let queryProdutos = "SELECT * FROM produtos";
      if (conditions.length > 0) {
        queryProdutos += " WHERE " + conditions.join(" AND ");
      }
      queryProdutos += " ORDER BY promocao DESC, id_produto ASC";
      
      const result = await pool.query(queryProdutos, params);
      produtos = result.rows;
    } else {
      // Para a rota /pesquisa, buscar por termos e aplicar filtros
      const termosOriginais = pesq.split(" ").filter(Boolean);
      const termosFiltrados = termosOriginais
        .map(normalizarTexto)
        .filter((palavra) => palavra && !preposicoes.includes(palavra));

      if (termosFiltrados.length === 0)
        termosFiltrados.push(normalizarTexto(pesq));

      produtos = await buscarProdutosPorTermos(termosFiltrados, filtros);
    }

    return {
      dados: produtos,
      mensagem: `Foram encontrados ${produtos.length} produtos para a pesquisa.`,
      status: 200,
      sucesso: true,
    };
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    return {
      dados: [],
      mensagem: "Erro no servidor",
      status: 500,
      sucesso: false,
    };
  }
};

const pesquisarProdutosPorCategoria = async (req, res, filtros = {}) => {
  const { categoria } = req.params;

  try {
    const resultado = await buscarProdutosPorCategoriaSlug(categoria, filtros);
    return {
      dados: resultado.produtos,
      mensagem: resultado.mensagem,
      status: resultado.status || 200,
      sucesso: resultado.status !== 404,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return {
      dados: [],
      mensagem: "Erro no servidor",
      status: 500,
      sucesso: false,
    };
  }
};

const pesquisarProdutosRelacionados = async (req, res) => {
  const { idProduto } = req.params;

  try {
    const relacionados = await buscarProdutosRelacionados(idProduto);

    if (relacionados.length === 0) {
      return responder(res, {
        dados: [],
        mensagem: "Produto não tem categorias para buscar relacionados.",
      });
    }

    return responder(res, {
      dados: relacionados,
      mensagem: `Foram encontrados ${relacionados.length} produtos relacionados.`,
    });
  } catch (error) {
    console.error("Erro ao buscar relacionados:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao buscar relacionados.",
    });
  }
};

module.exports = {
  pesquisarProdutos,
  pesquisarProdutosPorCategoria,
  pesquisarProdutosRelacionados,
  getFiltrosDinamicos,
};

