import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApiPorId } from "../../../api/requisicoes";
import Informacoes from "./componentes/Informacoes";
import Descricao from "./componentes/Descricao";
import TabelaCaracteristicas from "./componentes/TabelaCaracteristicas";
import ProdutosCarrossel from "../../componentes/ProdutosCarrosel/ProdutosCarrossel";
import { useProdutos } from "../../contexto/ProdutosContexto";

const ProdutoDetalhado = () => {
  const { id } = useParams();
  const { produtos, buscarRelacionados } = useProdutos();
  const [produto, setProduto] = useState({});
  const [categoriasDoProduto, setCategoriasDoProduto] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const resposta = await fetchApiPorId("produtos", id);
      setProduto(resposta.dados);

      const resposta2 = await fetchApiPorId("produtos/categorias", id);
      const categorias = resposta2.dados;
      setCategoriasDoProduto(categorias.map((c) => c.categoria));

      await buscarRelacionados(id);
    };

    carregarDados();
  }, [id]);

  const rotaVerMais =
    categoriasDoProduto.length > 0
      ? `/pesquisa?pesq=${encodeURIComponent(categoriasDoProduto.join(" "))}`
      : "/pesquisa";

  return (
    <div className="d-flex flex-column gap-5">
      <Informacoes produto={produto} />
      <Descricao produto={produto} />
      <TabelaCaracteristicas produto={produto} />
      <ProdutosCarrossel
        titulo="Produtos relacionados"
        produtos={produtos}
        rota={rotaVerMais}
      />
    </div>
  );
};

export default ProdutoDetalhado;
