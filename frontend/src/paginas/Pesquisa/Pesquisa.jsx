import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useProdutos } from "../../contexto/ProdutosContexto";
import CardProduto from "../../componentes/CardProduto/CardProduto";
import { useCategorias } from "../../contexto/CategoriasContexto";

const Pesquisa = () => {
  const { produtos, buscarTodosProdutos, buscarPorCategoria, buscarPorTexto } =
    useProdutos();
  const [favoritos, setFavoritos] = useState([]);
  const [parametroPesquisa, setParametroPesquisa] = useState("");
  const [searchParams] = useSearchParams();
  const { categoria } = useParams();
  const { buscarNomePorSlug } = useCategorias();

  useEffect(() => {
    const termoPesq = searchParams.get("pesq");

    if (categoria) {
      const nomeExibicao = buscarNomePorSlug(categoria) || categoria;
      setParametroPesquisa(nomeExibicao);
      buscarPorCategoria(categoria);
    } else if (termoPesq) {
      setParametroPesquisa(termoPesq);
      buscarPorTexto(termoPesq);
    } else {
      setParametroPesquisa("Todos os Produtos");
      buscarTodosProdutos();
    }
  }, [categoria, searchParams]);

  return (
    <div className="container d-flex flex-column gap-3">
      <h1>{`Resultado para: "${parametroPesquisa}"`}</h1>
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
    </div>
  );
};

export default Pesquisa;
