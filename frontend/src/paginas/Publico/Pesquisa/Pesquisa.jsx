import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { useProdutos } from "../../../contexto/ProdutosContexto";
import { useCategorias } from "../../../contexto/CategoriasContexto";

import CardProduto from "../../../componentes/CardProduto/CardProduto";
import FiltrosProdutos from "../../../componentes/FiltrosProdutos/FiltrosProdutos";

const PRODUTOS_POR_CARGA = 6; // Define quantos produtos carregar por vez

const Pesquisa = () => {
  const {
    produtos,
    filtros,
    buscarTodosProdutos,
    buscarPorCategoria,
    buscarPorTexto,
  } = useProdutos();
  const [favoritos, setFavoritos] = useState([]);
  const [parametroPesquisa, setParametroPesquisa] = useState("");
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    marca: "",
    familia_olfativa: "",
    concentracao: "",
    preco: "",
  });
  const [produtosExibidos, setProdutosExibidos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoria } = useParams();
  const { buscarNomePorSlug } = useCategorias();

  // Função para extrair filtros da URL
  const extrairFiltrosDaURL = () => {
    return {
      marca: searchParams.get("marca") || "",
      familia_olfativa: searchParams.get("familia_olfativa") || "",
      concentracao: searchParams.get("concentracao") || "",
      preco: searchParams.get("preco") || "",
    };
  };

  // Função para atualizar a URL com os filtros
  const atualizarURLComFiltros = (novosFiltros) => {
    const params = new URLSearchParams(searchParams);

    // Remove filtros vazios e adiciona os novos
    Object.keys(novosFiltros).forEach((key) => {
      if (novosFiltros[key] && novosFiltros[key].trim() !== "") {
        params.set(key, novosFiltros[key]);
      } else {
        params.delete(key);
      }
    });

    // Mantém o parâmetro de pesquisa se existir
    const termoPesq = searchParams.get("pesq");
    if (termoPesq) {
      params.set("pesq", termoPesq);
    }

    setSearchParams(params);
  };

  // Função para lidar com mudanças nos filtros
  const handleFiltrosChange = (novosFiltros) => {
    setFiltrosAtivos(novosFiltros);
    atualizarURLComFiltros(novosFiltros);
  };

  // Efeito para buscar produtos e inicializar a exibição
  useEffect(() => {
    const termoPesq = searchParams.get("pesq");
    const filtrosDaURL = extrairFiltrosDaURL();
    setFiltrosAtivos(filtrosDaURL);

    const fetchData = async () => {
      if (categoria) {
        const nomeExibicao = buscarNomePorSlug(categoria) || categoria;
        setParametroPesquisa(nomeExibicao);
        await buscarPorCategoria(categoria, filtrosDaURL);
      } else if (termoPesq) {
        setParametroPesquisa(termoPesq);
        await buscarPorTexto(termoPesq, filtrosDaURL);
      } else {
        setParametroPesquisa("Todos os Produtos");
        await buscarTodosProdutos(filtrosDaURL);
      }
    };

    fetchData();
  }, [categoria, searchParams]);

  // Efeito para atualizar produtos exibidos quando a lista completa de produtos muda
  useEffect(() => {
    if (produtos && Array.isArray(produtos)) {
      setProdutosExibidos(produtos.slice(0, PRODUTOS_POR_CARGA));
    }
  }, [produtos]);

  // Função para carregar mais produtos
  const handleCarregarMais = () => {
    const proximoIndice = produtosExibidos.length;
    const novosProdutos = produtos.slice(
      proximoIndice,
      proximoIndice + PRODUTOS_POR_CARGA
    );
    setProdutosExibidos((prevProdutos) => [...prevProdutos, ...novosProdutos]);
  };

  // Verifica se o botão de carregar mais deve aparecer
  const mostrarBotaoCarregarMais = produtosExibidos.length < produtos.length;

  return (
    <div className="row">
      {/* Coluna da Esquerda: Filtros */}
      <div className="col-lg-3 col-md-4">
        <FiltrosProdutos
          filtros={filtros}
          filtrosAtivos={filtrosAtivos}
          onFiltrosChange={handleFiltrosChange}
        />
      </div>

      {/* Coluna da Direita: Resultados da Busca */}
      <div className="col-lg-9 col-md-8">
        <div className="border rounded resultado-pesquisa">
          <h2>Resultado da busca: "{parametroPesquisa}"</h2>
          <p className="text-muted">Total de produtos: {produtos.length}</p>
        </div>

        <div className="row row-gap-3 mt-3">
          {produtosExibidos.map((produto, index) => (
            <CardProduto
              key={index}
              produto={produto}
              isPaginaFavoritos={false}
              className="col-12 col-sm-6 col-md-4 px-2"
            />
          ))}
        </div>

        {produtos.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">
              Nenhum produto encontrado com os filtros selecionados.
            </h3>
            <h5 className="text-muted">
              Tente ajustar os filtros ou limpar a pesquisa.
            </h5>
          </div>
        )}

        {mostrarBotaoCarregarMais && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleCarregarMais}>
              Carregar Mais Produtos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pesquisa;
