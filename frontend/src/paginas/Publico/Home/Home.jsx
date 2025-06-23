import React, { useEffect } from "react";

import { useProdutos } from "../../../contexto/ProdutosContexto";

import ImagensCarrossel from "./componentes/ImagensCarrossel";
import ProdutosCarrossel from "../../../componentes/ProdutosCarrosel/ProdutosCarrossel";

const Home = () => {
  const { buscarTodosProdutos, produtos } = useProdutos();

  useEffect(() => {
    buscarTodosProdutos();
  }, []);

  const lancamentos = produtos.filter((p) => p.lancamento);
  const promocoes = produtos.filter((p) => p.promocao);
  const lancamentosComBanner = lancamentos
    .filter((p) => p.lancamento)
    .slice(0, 4);

  return (
    <div className="d-flex flex-column gap-5">
      <ImagensCarrossel produtos={lancamentosComBanner} />
      <ProdutosCarrossel
        titulo="Lançamentos"
        produtos={lancamentos}
        rota="/pesquisa/categoria/lancamentos"
      />
      <ProdutosCarrossel
        titulo="Promoções"
        produtos={promocoes}
        rota="/pesquisa/categoria/promocoes"
      />
    </div>
  );
};

export default Home;
