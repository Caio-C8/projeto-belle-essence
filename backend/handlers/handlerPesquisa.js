const responder = require("../utilidades/responder");
const normalizarTexto = require("../utilidades/normalizarTexto");
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

const pesquisarProdutos = async (req, res) => {
  const { pesq } = req.query;
  if (!pesq) {
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Parâmetro 'pesq' obrigatório.",
    });
  }

  try {
    const produtoPorCodigo = await buscarProdutoPorCodigo(pesq);
    if (produtoPorCodigo) {
      return responder(res, {
        dados: [produtoPorCodigo],
        mensagem: `Produto com código '${pesq}' encontrado.`,
      });
    }

    const termosOriginais = pesq.split(" ").filter(Boolean);
    const termosFiltrados = termosOriginais
      .map(normalizarTexto)
      .filter((palavra) => palavra && !preposicoes.includes(palavra));

    if (termosFiltrados.length === 0)
      termosFiltrados.push(normalizarTexto(pesq));

    const produtos = await buscarProdutosPorTermos(termosFiltrados);

    return responder(res, {
      dados: produtos,
      mensagem: `Foram encontrados ${produtos.length} produtos para a pesquisa.`,
    });
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const pesquisarProdutosPorCategoria = async (req, res) => {
  const { categoria } = req.params;
  try {
    const { produtos, mensagem, status } = await buscarProdutosPorCategoriaSlug(
      categoria
    );

    return responder(res, {
      status: status || 200,
      sucesso: status !== 404,
      dados: produtos,
      mensagem,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
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
};
