import React, { useState, useEffect } from "react";
import { fetchApi } from "../../../api/requisicoes";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitados = await fetchApi("produtos");

      setProdutos(dadosRequisitados);
    };

    carregarDados();
  }, []);

  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      {produtos.map((produto) => (
        <div
          style={{ border: "1px solid #000", padding: "10px", margin: "10px" }}
          key={produto.id_produto}
        >
          {/* {produto.imagem && (
            <img src={produto.imagem} alt={`Imagem ${produto.nome}`} />
          )}

          {produto.banner && (
            <img src={produto.banner} alt={`Banner ${produto.nome}`} />
          )}

          {produto.promocao ? (
            <img src={produto.banner_promocao} alt={`Banner ${produto.nome}`} />
          ) : (
            <></>
          )} */}

          {produto.lancamento && <p style={{ color: "green" }}>Lançamento!</p>}
          {produto.promocao && <p style={{ color: "red" }}>Em Promoção!</p>}

          <p>Nome: {produto.nome}</p>
          <p>Marca: {produto.marca}</p>
          <p>
            {produto.promocao
              ? `Preço promocional: ${produto.preco_promocao}`
              : `Preço: ${produto.preco}`}
          </p>
          <p>Quantidade estoque: {produto.qtde_estoque}</p>
          <p>Número de vendas: {produto.numero_vendas}</p>
          <p>Código: {produto.codigo_produto}</p>
          <p>Descrição: {produto.descricao}</p>
          <p>Promoção: {produto.descricao_promocao}</p>
          <p>
            {produto.volume !== null
              ? `Volume: ${produto.volume}`
              : `Volume não informado`}
          </p>
          <p>
            {produto.familia_olfativa !== null
              ? `Família olfativa: ${produto.familia_olfativa}`
              : `Família olfativa não informada`}
          </p>
          <p>
            {produto.concentracao !== null
              ? `Concentração: ${produto.concentracao}`
              : `Concentração não informada`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Produtos;
