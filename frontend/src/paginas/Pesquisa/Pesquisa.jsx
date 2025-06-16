import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useProdutos } from "../../contexto/ProdutosContexto";
import CardProduto from "../../componentes/CardProduto/CardProduto";
import FiltrosProdutos from "../../componentes/FiltrosProdutos/FiltrosProdutos";
import { useCategorias } from "../../contexto/CategoriasContexto";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoria } = useParams();
  const { buscarNomePorSlug } = useCategorias();
  const navigate = useNavigate();

  const extrairFiltrosDaURL = () => {
    return {
      marca: searchParams.get("marca") || "",
      familia_olfativa: searchParams.get("familia_olfativa") || "",
      concentracao: searchParams.get("concentracao") || "",
      preco: searchParams.get("preco") || "",
    };
  };

  const atualizarURLComFiltros = (novosFiltros) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(novosFiltros).forEach((key) => {
      if (novosFiltros[key] && novosFiltros[key].trim() !== "") {
        params.set(key, novosFiltros[key]);
      } else {
        params.delete(key);
      }
    });

    const termoPesq = searchParams.get("pesq");
    if (termoPesq) {
      params.set("pesq", termoPesq);
    }

    setSearchParams(params);
  };

  const handleFiltrosChange = (novosFiltros) => {
    setFiltrosAtivos(novosFiltros);
    atualizarURLComFiltros(novosFiltros);
  };

  useEffect(() => {
    const termoPesq = searchParams.get("pesq");
    const filtrosDaURL = extrairFiltrosDaURL();
    setFiltrosAtivos(filtrosDaURL);

    if (categoria) {
      const nomeExibicao = buscarNomePorSlug(categoria) || categoria;
      setParametroPesquisa(nomeExibicao);
      buscarPorCategoria(categoria, filtrosDaURL);
    } else if (termoPesq) {
      setParametroPesquisa(termoPesq);
      buscarPorTexto(termoPesq, filtrosDaURL);
    } else {
      setParametroPesquisa("Todos os Produtos");
      buscarTodosProdutos(filtrosDaURL);
    }
  }, [categoria, searchParams]);

  return (
    <div className="container d-flex flex-column gap-3">
      <h1>{`Resultado para: "${parametroPesquisa}"`}</h1>

      {/* Componente de Filtros */}
      <FiltrosProdutos
        filtros={filtros}
        filtrosAtivos={filtrosAtivos}
        onFiltrosChange={handleFiltrosChange}
      />

      <h4>{`Total: ${produtos.length} produtos encontrados`}</h4>

      <div className="row row-gap-3">
        {produtos.map((produto, index) => (
          <CardProduto
            key={index}
            produto={produto}
            isFavorito={favoritos.includes(produto.id_produto)}
            atualizarFavoritos={(novoFavorito) => {
              setFavoritos((prev) =>
                prev.includes(novoFavorito)
                  ? prev.filter((id) => id !== novoFavorito)
                  : [...prev, novoFavorito]
              );
            }}
            favoritos={favoritos}
            isPaginaFavoritos={false}
          />
        ))}
      </div>

      {produtos.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted">
            Nenhum produto encontrado com os filtros selecionados.
          </h5>
          <p className="text-muted">
            Tente ajustar os filtros ou limpar a pesquisa.
          </p>
        </div>
      )}
    </div>
  );
};

export default Pesquisa;
