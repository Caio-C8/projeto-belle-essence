import React, { useState, useEffect } from "react";
import { fetchApi } from "../../../api/requisicoes";
import ImagensCarrossel from "./componentes/ImagensCarrossel";
import ProdutosCarrossel from "../../componentes/ProdutosCarrosel/ProdutosCarrossel";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitados = await fetchApi("produtos");

      setProdutos(dadosRequisitados);
    };

    carregarDados();
  }, []);

  return (
    <div className="">
      <ImagensCarrossel />
      <ProdutosCarrossel titulo="Mais Vendidos" produtos={produtos} />
      <ProdutosCarrossel titulo="Promoções" produtos={produtos} />
    </div>
  );
};

export default Home;
