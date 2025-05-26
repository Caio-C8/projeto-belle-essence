import React, { useState } from "react";
import "./DadosPerfil.css";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";
import { useAutenticacao } from "../../../contexto/AutenticarContexto";
import Modal from "../../../componentes/Modal/Modal";
import { validarCamposAlterarDadosUsuario } from "../../../utilidades/validadores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { formatarData } from "../../../utilidades/formatarData";
import { mascararCpf } from "../../../utilidades/mascararCpf";

const DadosPerfil = ({ cliente, setCliente }) => {
  const {
    nome: nomePerfil,
    sobrenome: sobrenomePerfil,
    email: emailPerfil,
    celular: celularPerfil,
    data_nascimento: dataNascimentoPerfil,
    cpf: cpfPerfil,
  } = cliente;

  const { usuario, logout } = useAutenticacao();

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
  const navigate = useNavigate();

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setMostrarModal(true);
  };

  const fecharModal = () => setMostrarModal(false);

  const excluirConta = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir conta?");

    if (!confirmar) return;

    const idUsuario = usuario.id;

    try {
      const res = await fetch(
        `http://localhost:3000/deletar-conta/${idUsuario}`,
        {
          method: "DELETE",
        }
      );

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
        logout(true);
        navigate("/");
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  const camposPorTipo = () => {
    switch (tipoModal) {
      case "nome":
        return [
          {
            label: "Nome",
            placeholder: "Seu nome",
            name: "nome",
            value: nome,
            onChange: (e) => setNome(e.target.value),
          },
          {
            label: "Sobrenome",
            placeholder: "Seu sobrenome",
            name: "sobrenome",
            value: sobrenome,
            onChange: (e) => setSobrenome(e.target.value),
          },
        ];
      case "celular":
        return [
          {
            label: "Celular",
            placeholder: "(00) 90000-0000",
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
      case "e-mail":
        return [
          {
            label: "E-mail",
            placeholder: "Seu e-mail",
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
            placeholder: "Sua senha",
            name: "senha",
            type: "password",
            value: senha,
            onChange: (e) => setSenha(e.target.value),
          },
          {
            label: "Confirmar Senha",
            placeholder: "Confirme sua senha",
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
          headers: { "Content-Type": "application/json" },
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
    <div>
      <h1 className="fw-bold mb-2">Seus Dados</h1>

      <div className="rounded border bg-white p-4 d-flex flex-column gap-2">
        <div className="row divisoria mb-2">
          <h5>Dados Pessoais</h5>
        </div>

        <div className="mb-2">
          <h6 className="mb-1">Nome Completo</h6>
          <div className="d-flex justify-content-between align-items-center campo-dado">
            <p>{`${nomePerfil} ${sobrenomePerfil}`}</p>
            <button onClick={() => abrirModal("nome")}>
              <FontAwesomeIcon
                style={{ color: "#FFB4A2", fontSize: "1.3rem" }}
                className="icon"
                icon={faPenClip}
              />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <h6 className="mb-1">Data de Nascimento</h6>
          <div className="d-flex justify-content-between align-items-center campo-dado">
            <p>
              {dataNascimentoPerfil
                ? formatarData(dataNascimentoPerfil)
                : "Data não informada"}
            </p>
            <button onClick={() => abrirModal("data")}>
              <FontAwesomeIcon
                style={{ color: "#FFB4A2", fontSize: "1.3rem" }}
                className="icon"
                icon={faPenClip}
              />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <h6 className="mb-1">Celular</h6>
          <div className="d-flex justify-content-between align-items-center campo-dado">
            <p>{celularPerfil}</p>
            <button onClick={() => abrirModal("celular")}>
              <FontAwesomeIcon
                style={{ color: "#FFB4A2", fontSize: "1.3rem" }}
                className="icon"
                icon={faPenClip}
              />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="mb-1">CPF</h6>
          <div className="d-flex justify-content-between align-items-center campo-dado">
            <p>{cpfPerfil ? mascararCpf(cpfPerfil) : "CPF não informado"}</p>
          </div>
        </div>

        <div className="row divisoria mb-2">
          <h5>Dados de Acesso</h5>
        </div>

        <div className="mb-2">
          <h6 className="mb-1">E-mail</h6>
          <div className="d-flex justify-content-between align-items-center campo-dado">
            <p>{emailPerfil}</p>
          </div>
        </div>

        <div
          className="d-flex justify-content-between px-2"
          style={{ width: "500px" }}
        >
          <button
            className="btn btn-primary"
            onClick={() => abrirModal("e-mail")}
          >
            Alterar e-mail
          </button>
          <button
            className="btn btn-primary"
            onClick={() => abrirModal("senha")}
          >
            Alterar senha
          </button>
          <button className="btn btn-cancelar" onClick={excluirConta}>
            Excluir conta
          </button>
        </div>

        <Modal
          titulo={`Alterar ${tipoModal}`}
          aberto={mostrarModal}
          fechar={fecharModal}
          salvar={salvar}
          campos={camposPorTipo()}
        />
      </div>
    </div>
  );
};

export default DadosPerfil;
