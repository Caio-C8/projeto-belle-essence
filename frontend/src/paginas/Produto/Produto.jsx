import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApiPorId } from "../../../api/requisicoes";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitados = await fetchApiPorId("produtos", id);

      setProduto(dadosRequisitados);
    };

    carregarDados();
  }, [id]);

  return (
    <div>
      <h1>{produto.nome}</h1>
      <h2>{produto.marca}</h2>
      <p>{produto.volume}</p>
      <p>{produto.descricao}</p>
      <p>{produto.familia_olfativa}</p>
      <p>{produto.concentracao}</p>
      <p>{produto.preco}</p>
      <p>{produto.qtde_estoque}</p>
      <p>{produto.preco_promocao}</p>
    </div>
  );
};

export default Produto;
