import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchApiPorId } from "../../api/requisicoes";
import { useAutenticacao } from "./AutenticarContexto";

const ClienteContexto = createContext();

export const ProvedorCliente = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [cliente, setCliente] = useState({});

  const carregarCliente = async () => {
    if (!usuario?.id && usuario?.tipo === "admin") return;
    const dados = await fetchApiPorId("clientes", usuario.id);
    setCliente(dados || {});
  };

  const contexto = { cliente, setCliente, carregarCliente };

  return (
    <ClienteContexto.Provider value={contexto}>
      {children}
    </ClienteContexto.Provider>
  );
};

export const useCliente = () => useContext(ClienteContexto);
