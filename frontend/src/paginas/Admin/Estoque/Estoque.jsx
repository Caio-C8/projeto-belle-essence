import React, { useEffect } from "react";

import CardProdutoEstoque from "./componentes/CardProdutoEstoque";
import { useProdutos } from "../../../contexto/ProdutosContexto";

const Estoque = () => {
  const { produtos, buscarTodosProdutos } = useProdutos();

  useEffect(() => {
    buscarTodosProdutos();
  }, []);

  return (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div>
          <h5>Filtros</h5>
          {/* Exemplo de espaço reservado para filtros */}
          {/* <FiltrosComponent /> */}
        </div>
      </div>

      <div className="col-md-9 d-flex flex-column gap-4">
        <div className="border rounded resultado-pesquisa">
          <h2>Resultado da busca: "todos"</h2>
          <p className="text-muted">Total de produtos: {produtos.length}</p>
        </div>

        <div className="d-flex flex-column gap-4">
          {produtos.length === 0 || !produtos ? (
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text-muted">Nenhum produto encontrado.</h3>
            </div>
          ) : (
            produtos.map((produto, index) => (
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
