import React, { createContext, useContext, useEffect, useState } from "react";
import { useAutenticacao } from "./AutenticarContexto";
import { fetchApiPorId } from "../../api/requisicoes";

const EnderecoContexto = createContext();

export const ProvedorEndereco = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [enderecos, setEnderecos] = useState([]);

  const carregarEnderecos = async () => {
    if (!usuario) return;

    const dados = await fetchApiPorId("enderecos", usuario.id);
    setEnderecos(dados || []);
  };

  const adicionarEndereco = (endereco) => {
    setEnderecos((prev) => [...prev, endereco]);
  };

  const atualizarEndereco = (idEndereco, novosDados) => {
    setEnderecos((prev) =>
      prev.map((e) =>
        e.id_endereco === idEndereco ? { ...e, ...novosDados } : e
      )
    );
  };

  const deletarEndereco = (idEndereco) => {
    setEnderecos((prev) => prev.filter((e) => e.id_endereco !== idEndereco));
  };

  const contexto = {
    enderecos,
    setEnderecos,
    adicionarEndereco,
    atualizarEndereco,
    deletarEndereco,
    carregarEnderecos,
  };

  return (
    <EnderecoContexto.Provider value={contexto}>
      {children}
    </EnderecoContexto.Provider>
  );
};

export const useEnderecos = () => useContext(EnderecoContexto);
