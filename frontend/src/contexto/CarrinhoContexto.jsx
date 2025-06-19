import React, { createContext, useContext, useEffect, useState } from "react";
import { useAutenticacao } from "./AutenticarContexto";
import { fetchApiPorId } from "../../api/requisicoes";

const CarrinhoContexto = createContext();

export const ProvedorCarrinho = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [idCarrinho, setIdCarrinho] = useState(null);

  const carregarCarrinho = async () => {
    if (!usuario) return;

    const resultado = await fetchApiPorId("itens-carrinho", usuario.id);
    const itens = resultado?.itensCarrinho || [];

    if (itens.length > 0) {
      setIdCarrinho(itens[0].id_carrinho);
    }

    const detalhados = await Promise.all(
      itens.map(async (item) => {
        const produto = await fetchApiPorId("produtos", item.id_produto);
        return {
          ...produto,
          qtde: item.qtde,
          id_produto: item.id_produto,
          id_item_carrinho: item.id_item_carrinho,
        };
      })
    );

    setProdutosCarrinho(detalhados);
  };

  const adicionarProduto = async (idProduto) => {
    if (!usuario) return;

    const res = await fetch("http://localhost:3000/colocar-produtos-carrinho", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto, idUsuario: usuario.id }),
    });

    await carregarCarrinho();

    return res;
  };

  const atualizarQuantidade = async (idProduto, novaQuantidade) => {
    if (!usuario) return;

    await fetch("http://localhost:3000/atualizar-quantidade", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario: usuario.id,
        idProduto,
        novaQuantidade,
      }),
    });

    setProdutosCarrinho((anteriores) =>
      anteriores.map((p) =>
        p.id_produto === idProduto ? { ...p, qtde: novaQuantidade } : p
      )
    );
  };

  const removerProduto = async (idProduto) => {
    if (!usuario) return;

    await fetch(
      `http://localhost:3000/retirar-produtos-carrinho/${usuario.id}/${idProduto}`,
      { method: "DELETE" }
    );

    alert("Produto removido da sacola.");

    setProdutosCarrinho((anteriores) =>
      anteriores.filter((p) => p.id_produto !== idProduto)
    );
  };

  const esvaziarCarrinho = async () => {
    if (!usuario) return;

    await fetch(`http://localhost:3000/esvaziar-carrinho/${usuario.id}`, {
      method: "DELETE",
    });

    setProdutosCarrinho([]);
  };

  const contexto = {
    idCarrinho,
    produtosCarrinho,
    setProdutosCarrinho,
    carregarCarrinho,
    adicionarProduto,
    atualizarQuantidade,
    removerProduto,
    esvaziarCarrinho,
  };

  return (
    <CarrinhoContexto.Provider value={contexto}>
      {children}
    </CarrinhoContexto.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContexto);
