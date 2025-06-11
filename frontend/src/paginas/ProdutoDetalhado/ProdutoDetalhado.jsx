import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApiPorId } from "../../../api/requisicoes";
import Informacoes from "./componentes/Informacoes";
import Descricao from "./componentes/Descricao";
import TabelaCaracteristicas from "./componentes/TabelaCaracteristicas";
import ProdutosCarrossel from "../../componentes/ProdutosCarrosel/ProdutosCarrossel";
import { useProdutos } from "../../contexto/ProdutoContexto";

const ProdutoDetalhado = () => {
  const { id } = useParams();
  const { produtos } = useProdutos();
  const [produto, setProduto] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitadosProduto = await fetchApiPorId("produtos", id);

      setProduto(dadosRequisitadosProduto);
    };

    carregarDados();
  }, [id]);

  return (
    <div className="d-flex flex-column gap-5">
      <Informacoes produto={produto} />
      <Descricao produto={produto} />
      <TabelaCaracteristicas produto={produto} />
      <ProdutosCarrossel titulo="Produtos relacionados" produtos={produtos} />
    </div>
  );
};

export default ProdutoDetalhado;
