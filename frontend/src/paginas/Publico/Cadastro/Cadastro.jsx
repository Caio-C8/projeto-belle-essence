import React, { useState } from "react";
import "./Cadastro.css";
import { useMask } from "@react-input/mask";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { validarCamposCadastro } from "../../../utilidades/validadores";

import Input from "../../../componentes/Campos/Input";
import InputSenha from "../../../componentes/Campos/InputSenha";
import Select from "../../../componentes/Campos/Select";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [tipo, setTipo] = useState("");

  const maskCelular = useMask({
    mask: "(__) _____-____",
    replacement: { _: /\d/ },
  });
  const maskCpf = useMask({ mask: "___.___.___-__", replacement: { _: /\d/ } });
  const maskCep = useMask({ mask: "_____-___", replacement: { _: /\d/ } });
  const maskNumero = useMask({ mask: "__________", replacement: { _: /\d/ } });

  const estadosSiglas = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  const navigate = useNavigate();

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    const erro = validarCamposCadastro({
      email,
      senha,
      nome,
      sobrenome,
      celular,
      dataNascimento,
      cpf,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      tipo,
    });

    if (erro) return alert(erro);
    if (senha !== confirmarSenha)
      return alert("As senhas digitadas são diferentes.");

    const usuario = {
      email,
      senha,
      confirmarSenha,
      nome,
      sobrenome,
      celular,
      dataNascimento,
      cpf,
    };

    const endereco = {
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      complemento,
      pontoReferencia,
      tipo,
    };

    try {
      const res = await fetch("http://localhost:3000/cadastro-usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, endereco }),
      });

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setNome("");
        setSobrenome("");
        setCelular("");
        setDataNascimento("");
        setCpf("");
        setCep("");
        setLogradouro("");
        setNumero("");
        setBairro("");
        setCidade("");
        setEstado("");
        setComplemento("");
        setPontoReferencia("");
        setTipo("");
        navigate("/login");
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <form onSubmit={cadastrarUsuario} className="mx-auto card shadow p-4">
      <h2 className="text-center mb-4">Criar Nova Conta</h2>

      <div className="row divisoria">
        <h5>Dados pessoais</h5>
      </div>

      <div className="row">
        <Input
          label="Nome"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="col-md-6"
        />

        <Input
          label="Sobrenome"
          placeholder="Seu sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          className="col-md-6"
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="col-md-6"
        />

        <Input
          label="Celular"
          type="tel"
          placeholder="(00) 00000-0000"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          inputRef={maskCelular}
          className="col-md-6"
        />

        <Input
          label="Data de Nascimento"
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="col-md-6"
        />

        <Input
          label="CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          inputRef={maskCpf}
          className="col-md-6"
        />

        <InputSenha
          label="Senha"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="col-md-6"
        />

        <InputSenha
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="col-md-6"
        />
      </div>

      <div className="row divisoria">
        <h5>Endereço</h5>
      </div>

      <div className="row">
        <Input
          label="CEP"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          inputRef={maskCep}
          className="col-md-6"
        />

        <Select
          label="Tipo de Endereço"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          options={["Residencial", "Comercial"]}
          className="col-md-6"
        />

        <Input
          label="Logradouro"
          placeholder="Rua, avenida, etc."
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          className="col-12"
        />

        <Input
          label="Número"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          inputRef={maskNumero}
          className="col-md-6"
        />

        <Input
          label="Complemento (opcional)"
          placeholder="Apto, bloco, etc."
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          className="col-md-6"
        />

        <Input
          label="Bairro"
          placeholder="Seu bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="col-md-6"
        />

        <Input
          label="Ponto de Referência (opcional)"
          placeholder="Próximo a..."
          value={pontoReferencia}
          onChange={(e) => setPontoReferencia(e.target.value)}
          className="col-md-6"
        />

        <Select
          label="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          options={estadosSiglas}
          className="col-md-6"
        />

        <Input
          label="Cidade"
          placeholder="Sua cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="col-md-6"
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary mt-3">
          Criar Conta
        </button>
      </div>

      <div className="text-center mt-3">
        <small>
          Já tem uma conta?{" "}
          <Link to="/login" className="link">
            Faça login
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Cadastro;
