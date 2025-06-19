import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAutenticacao } from "../../../contexto/AutenticarContexto";
import { useCliente } from "../../../contexto/ClienteContexto";

import DadosPerfil from "./componentes/DadosPerfil";
import EnderecosPerfil from "./componentes/EnderecosPerfil";
import PedidosPerfil from "./componentes/PedidosPerfil";
import Sidebar from "./componentes/SideBar";

const Perfil = () => {
  const { logout } = useAutenticacao();
  const { cliente, setCliente, carregarCliente } = useCliente();

  useEffect(() => {
    carregarCliente();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const pagina = searchParams.get("aba") || "dados";

  const mudarPagina = (nova) => setSearchParams({ aba: nova });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Sidebar pagina={pagina} setPagina={mudarPagina} logout={logout} />
        </div>
        <div className="col-md-9">
          {pagina === "dados" && (
            <DadosPerfil cliente={cliente} setCliente={setCliente} />
          )}
          {pagina === "enderecos" && (
            <EnderecosPerfil
              nome={cliente.nome}
              sobrenome={cliente.sobrenome}
            />
          )}
          {pagina === "pedidos" && <PedidosPerfil />}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
