import React, { useState } from "react";
import "./DadosPerfil.css";
import Modal from "../Modal/Modal";
import { useMask } from "@react-input/mask";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { validarCamposAlterarDadosUsuario } from "../../utilidades/validadores";

const DadosPerfil = ({ cliente, setCliente }) => {
  const {
    nome: nomePerfil,
    sobrenome: sobrenomePerfil,
    email: emailPerfil,
    celular: celularPerfil,
    data_nascimento: dataNascimentoPerfil,
    cpf: cpfPerfil,
  } = cliente;
  const { usuario } = useAutenticacao();
  const maskCelular = useMask({
    mask: "(__) _____-____",
    replacement: { _: /\d/ },
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [confirmarSenha, setConfirmarSenha] = useState(null);
  const [nome, setNome] = useState(null);
  const [sobrenome, setSobrenome] = useState(null);
  const [celular, setCelular] = useState(null);
  const [dataNascimento, setDataNascimento] = useState(null);

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setMostrarModal(true);
  };

  const fecharModal = () => setMostrarModal(false);

  const camposPorTipo = () => {
    switch (tipoModal) {
      case "nome":
        return [
          {
            label: "Nome",
            name: "nome",
            value: nome,
            onChange: (e) => setNome(e.target.value),
          },
          {
            label: "Sobrenome",
            name: "sobrenome",
            value: sobrenome,
            onChange: (e) => setSobrenome(e.target.value),
          },
        ];
      case "celular":
        return [
          {
            label: "Celular",
            mask: maskCelular,
            name: "celular",
            value: celular,
            onChange: (e) => setCelular(e.target.value),
          },
        ];
      case "data":
        return [
          {
            label: "Data de Nascimento",
            name: "dataNascimento",
            type: "date",
            value: dataNascimento,
            onChange: (e) => setDataNascimento(e.target.value),
          },
        ];
      case "email":
        return [
          {
            label: "E-mail",
            name: "email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
          },
        ];
      case "senha":
        return [
          {
            label: "Nova Senha",
            name: "senha",
            type: "password",
            value: senha,
            onChange: (e) => setSenha(e.target.value),
          },
          {
            label: "Confirmar Senha",
            name: "confirmarSenha",
            type: "password",
            value: confirmarSenha,
            onChange: (e) => setConfirmarSenha(e.target.value),
          },
        ];
      default:
        return [];
    }
  };

  const salvar = async () => {
    const erro = validarCamposAlterarDadosUsuario(
      email,
      senha,
      confirmarSenha,
      nome,
      sobrenome,
      celular,
      dataNascimento
    );

    if (erro) return alert(erro);

    const dadosAlterados = {
      email,
      senha,
      confirmarSenha,
      nome,
      sobrenome,
      celular,
      dataNascimento,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/atualizar-usuario/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosAlterados),
        }
      );

      const mensagem = await res.json();

      if (res.ok) {
        alert(mensagem.mensagem);
        setCliente((anterior) => ({
          ...anterior,
          ...(email && { email }),
          ...(nome && { nome }),
          ...(sobrenome && { sobrenome }),
          ...(celular && { celular }),
          ...(dataNascimento && { data_nascimento: dataNascimento }),
        }));
        setEmail(null);
        setSenha(null);
        setConfirmarSenha(null);
        setNome(null);
        setSobrenome(null);
        setCelular(null);
        setDataNascimento(null);
        fecharModal();
      } else {
        alert(`Erro ao alterar dados. ${mensagem.mensagem}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="dados-perfil">
      <div>
        {`Nome completo: ${nomePerfil} ${sobrenomePerfil}`}{" "}
        <button onClick={() => abrirModal("nome")}>Alterar nome</button>
      </div>
      <div>
        Celular: {celularPerfil}{" "}
        <button onClick={() => abrirModal("celular")}>Alterar celular</button>
      </div>
      <div>
        Data de nascimento: {dataNascimentoPerfil}{" "}
        <button onClick={() => abrirModal("data")}>
          Alterar data de nascimento
        </button>
      </div>
      <div>CPF: {cpfPerfil}</div>
      <div>
        E-mail: {emailPerfil}
        <button onClick={() => abrirModal("email")}>Alterar e-mail</button>
        <button onClick={() => abrirModal("senha")}>Alterar senha</button>
      </div>

      <Modal
        titulo={`Alterar ${tipoModal}`}
        aberto={mostrarModal}
        fechar={fecharModal}
        salvar={salvar}
        campos={camposPorTipo()}
      />
    </div>
  );
};

export default DadosPerfil;
