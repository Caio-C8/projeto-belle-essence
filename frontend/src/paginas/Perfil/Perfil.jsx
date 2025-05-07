import React, { useState, useEffect } from "react";
import DadosPerfil from "../../componentes/DadosPerfil/DadosPerfil";
import EnderecosPerfil from "../../componentes/EnderecosPerfil/EnderecosPerfil";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { fetchApiPorId } from "../../../api/requisicoes";

const Perfil = () => {
  const { logout, usuario } = useAutenticacao();
  const [pagina, setPagina] = useState("dados");
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitados = await fetchApiPorId("clientes", usuario.id);

      setCliente(dadosRequisitados);
    };

    carregarDados();
  }, []);

  return (
    <div>
      <nav>
        <button onClick={() => setPagina("dados")}>Dados</button>
        <button onClick={() => setPagina("enderecos")}>Endereços</button>
        <button onClick={() => setPagina("pedidos")}>Pedidos</button>
        <button onClick={logout}>Sair</button>
      </nav>

      <div>
        {pagina === "dados" && (
          <DadosPerfil cliente={cliente} setCliente={setCliente} />
        )}
        {pagina === "enderecos" && (
          <EnderecosPerfil nome={cliente.nome} sobrenome={cliente.sobrenome} />
        )}
        {/* {pagina === "pedidos" && <PedidosPerfil />} */}
      </div>
    </div>
  );
};

export default Perfil;
