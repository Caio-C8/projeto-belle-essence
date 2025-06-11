import React from "react";
import ImagensCarrossel from "./componentes/ImagensCarrossel";
import ProdutosCarrossel from "../../componentes/ProdutosCarrosel/ProdutosCarrossel";
import { useProdutos } from "../../contexto/ProdutoContexto";

const Home = () => {
  const { produtos } = useProdutos();

  return (
    <div className="d-flex flex-column gap-5">
      <ImagensCarrossel />
      <ProdutosCarrossel titulo="Mais Vendidos" produtos={produtos} />
      <ProdutosCarrossel titulo="Promoções" produtos={produtos} />
    </div>
  );
};

export default Home;
