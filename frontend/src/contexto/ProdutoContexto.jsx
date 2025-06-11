import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchApi } from "../../api/requisicoes";

const ProdutoContexto = createContext();

export const ProvedorProduto = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarProdutos = async () => {
    setCarregando(true);
    try {
      const dados = await fetchApi("produtos");
      setProdutos(dados || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
    setCarregando(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const contexto = { produtos, setProdutos, carregarProdutos, carregando };

  return (
    <ProdutoContexto.Provider value={contexto}>
      {children}
    </ProdutoContexto.Provider>
  );
};

export const useProdutos = () => useContext(ProdutoContexto);
