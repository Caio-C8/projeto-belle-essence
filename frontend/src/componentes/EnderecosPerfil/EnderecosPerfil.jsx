import React, { useState, useEffect } from "react";
import "./EnderecosPerfil.css";
import { fetchApiPorId } from "../../../api/requisicoes";
import { useAutenticacao } from "../../contexto/AutenticarContexto";

const EnderecosPerfil = ({ nome, sobrenome }) => {
  const { usuario } = useAutenticacao();
  const [endereco, setEndereco] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const dadosEndereco = await fetchApiPorId("enderecos", usuario.id);

      setEndereco(dadosEndereco);
    };

    carregarDados();
  }, []);

  return (
    <div className="enderecos">
      <div className="endereco">
        <div>{`${endereco.logradouro}, ${endereco.numero}`}</div>
        <div>{`${endereco.bairro} - CEP ${endereco.cep} - ${endereco.cidade} - ${endereco.estado}`}</div>
        <div>{`${endereco.tipo} - ${nome} ${sobrenome}`}</div>
        <button>Alterar</button>
        <button>Excluir</button>
      </div>

      <button>Cadastrar novo endereço</button>
    </div>
  );
};

export default EnderecosPerfil;
