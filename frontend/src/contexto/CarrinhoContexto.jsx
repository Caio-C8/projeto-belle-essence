import React, { createContext, useContext, useEffect, useState } from "react";
import { useAutenticacao } from "./AutenticarContexto";
import { fetchApiPorId } from "../../api/requisicoes";

const CarrinhoContexto = createContext();

export const ProvedorCarrinho = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);

  useEffect(() => {
    const carregarCarrinho = async () => {
      if (!usuario) return;

      const itens = await fetchApiPorId("itens-carrinho", usuario.id);
      const detalhados = await Promise.all(
        itens.map(async (item) => {
          const produto = await fetchApiPorId("produtos", item.id_produto);
          return { ...produto, qtde: item.qtde };
        })
      );

      setProdutosCarrinho(detalhados);
    };

    carregarCarrinho();
  }, [usuario]);

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

    setProdutosCarrinho((anteriores) =>
      anteriores.filter((p) => p.id_produto !== idProduto)
    );
  };

  const contexto = {
    produtosCarrinho,
    setProdutosCarrinho,
    atualizarQuantidade,
    removerProduto,
  };

  return (
    <CarrinhoContexto.Provider value={contexto}>
      {children}
    </CarrinhoContexto.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContexto);
