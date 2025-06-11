import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchApiPorId } from "../../api/requisicoes";
import { useAutenticacao } from "./AutenticarContexto";

const ClienteContexto = createContext();

export const ProvedorCliente = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const carregarCliente = async () => {
      if (!usuario?.id) return;
      const dados = await fetchApiPorId("clientes", usuario.id);
      setCliente(dados || {});
    };

    carregarCliente();
  }, [usuario]);

  const contexto = { cliente, setCliente };

  return (
    <ClienteContexto.Provider value={contexto}>
      {children}
    </ClienteContexto.Provider>
  );
};

export const useCliente = () => useContext(ClienteContexto);
