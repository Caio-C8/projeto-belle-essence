import React, { useState } from "react";
import DadosPerfil from "./componentes/DadosPerfil";
import EnderecosPerfil from "./componentes/EnderecosPerfil";
import Sidebar from "./componentes/SideBar";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { useCliente } from "../../contexto/ClienteContexto";

const Perfil = () => {
  const { logout } = useAutenticacao();
  const [pagina, setPagina] = useState("dados");
  const { cliente, setCliente } = useCliente();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Sidebar pagina={pagina} setPagina={setPagina} logout={logout} />
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
          {/* {pagina === "pedidos" && <PedidosPerfil />} */}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
