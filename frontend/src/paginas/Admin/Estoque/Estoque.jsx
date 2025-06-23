import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CardProdutoEstoque from "./componentes/CardProdutoEstoque";
import { useProdutos } from "../../../contexto/ProdutosContexto";
import FiltrosProdutos from "../../../componentes/FiltrosProdutos/FiltrosProdutos";

const Estoque = () => {
  const { produtos, buscarTodosProdutos, buscarPorTexto } = useProdutos();
  const [searchParams] = useSearchParams();
  const [parametroPesquisa, setParametroPesquisa] = useState("");
  const [filtrosAtivos, setFiltrosAtivos] = useState({ estoque: "" });

  useEffect(() => {
    buscarTodosProdutos();
  }, []);

  useEffect(() => {
    const termoPesq = searchParams.get("pesq");
    const filtrosDaURL = [];

    if (termoPesq) {
      setParametroPesquisa(termoPesq);
      buscarPorTexto(termoPesq, filtrosDaURL);
    } else {
      setParametroPesquisa("Todos os Produtos");
      buscarTodosProdutos(filtrosDaURL);
    }
  }, [searchParams]);

  const filtrarPorEstoque = (produto) => {
    const qtde = produto.qtde_estoque;

    switch (filtrosAtivos.estoque) {
      case "Estoque Alto":
        return qtde > 10;
      case "Estoque Médio":
        return qtde > 5 && qtde <= 10;
      case "Estoque Baixo":
        return qtde > 0 && qtde <= 5;
      case "Sem Estoque":
        return qtde === 0;
      default:
        return true;
    }
  };

  const produtosFiltrados = produtos.filter(filtrarPorEstoque);

  return (
    <div className="row">
      <div className="col-md-3 mb-4">
        <FiltrosProdutos
          filtros={null}
          filtrosAtivos={filtrosAtivos}
          onFiltrosChange={setFiltrosAtivos}
          configFiltros={[{ tipo: "estoque", label: "Volume do estoque" }]}
          valoresFiltrosPersonalizados={{
            estoque: [
              "Estoque Alto",
              "Estoque Médio",
              "Estoque Baixo",
              "Sem Estoque",
            ],
          }}
        />
      </div>

      <div className="col-md-9 d-flex flex-column gap-4">
        <div className="border rounded resultado-pesquisa">
          <h2>Resultado da busca: "{parametroPesquisa}"</h2>
          <p className="text-muted">
            Total de produtos: {produtosFiltrados.length}
          </p>
        </div>

        <div className="d-flex flex-column gap-4">
          {produtosFiltrados.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text-muted">Nenhum produto encontrado.</h3>
            </div>
          ) : (
            produtosFiltrados.map((produto, index) => (
              <div key={index}>
                <CardProdutoEstoque produto={produto} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Estoque;
