import React, { useState } from "react";
import { useMask } from "@react-input/mask";
import "./Cadastro.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validarCamposCadastro } from "../../utilidades/validadores";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [aparecerSenha, setAparecerSenha] = useState(false);
  const [aparecerConfirmarSenha, setAparecerConfirmarSenha] = useState(false);
  const maskCelular = useMask({
    mask: "(__) _____-____",
    replacement: { _: /\d/ },
  });
  const maskCpf = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [tipo, setTipo] = useState("");
  const maskCep = useMask({
    mask: "_____-___",
    replacement: { _: /\d/ },
  });
  const maskNumero = useMask({
    mask: "__________",
    replacement: { _: /\d/ },
  });

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

  const mostrarSenha = () => {
    setAparecerSenha((valorAnterior) => !valorAnterior);
  };

  const mostrarConfirmarSenha = () => {
    setAparecerConfirmarSenha((valorAnterior) => !valorAnterior);
  };

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
      complemento,
      pontoReferencia,
      tipo,
    });

    if (erro) return alert(erro);

    const usuario = {
      email,
      senha,
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

      if (res.ok) {
        alert("Usuário cadastrado com sucesso!");
        setEmail("");
        setSenha("");
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
        const { mensagem } = await res.json();
        if (mensagem) return alert(`Erro ao cadastrar usuário. ${mensagem}`);
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <form onSubmit={cadastrarUsuario} className="mx-auto card shadow">
      <h2 class="text-center mb-4">Criar Nova Conta</h2>

      <div className="row divisoria">
        <h5>Dados pessoais</h5>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Sobrenome</label>
          <input
            type="text"
            className="form-control"
            id="sobrenome"
            placeholder="Seu sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Celular</label>
          <input
            type="tel"
            className="form-control"
            id="celular"
            placeholder="(00) 00000-0000"
            ref={maskCelular}
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            id="nascimento"
            placeholder="dd/mm/aaaa"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            placeholder="000.000.000-00"
            ref={maskCpf}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Senha</label>
          <div className="input-group">
            <input
              type={aparecerSenha ? "text" : "password"}
              className="form-control"
              id="senha"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="input-group-text" onClick={mostrarSenha}>
              <i>
                <FontAwesomeIcon icon={aparecerSenha ? faEyeSlash : faEye} />
              </i>
            </span>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Confirmar Senha</label>
          <div className="input-group">
            <input
              type={aparecerConfirmarSenha ? "text" : "password"}
              className="form-control"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <span className="input-group-text" onClick={mostrarConfirmarSenha}>
              <i>
                <FontAwesomeIcon
                  icon={aparecerConfirmarSenha ? faEyeSlash : faEye}
                />
              </i>
            </span>
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="row divisoria">
        <h5>Endereço</h5>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">CEP</label>
          <input
            type="text"
            className="form-control"
            id="cep"
            placeholder="00000-000"
            ref={maskCep}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Tipo de Endereço</label>
          <select
            className="form-select"
            id="tipoEndereco"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option>Residencial</option>
            <option>Comercial</option>
          </select>
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Logradouro</label>
          <input
            type="text"
            className="form-control"
            id="logradouro"
            placeholder="Rua, avenida, etc."
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Número</label>
          <input
            type="text"
            className="form-control"
            id="numero"
            placeholder="Número"
            ref={maskNumero}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Complemento <small>(opcional)</small>
          </label>
          <input
            type="text"
            className="form-control"
            id="complemento"
            placeholder="Apto, bloco, etc."
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Bairro</label>
          <input
            type="text"
            className="form-control"
            id="bairro"
            placeholder="Seu bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Ponto de Referência <small>(opcional)</small>
          </label>
          <input
            type="text"
            className="form-control"
            id="referencia"
            placeholder="Próximo a..."
            value={pontoReferencia}
            onChange={(e) => setPontoReferencia(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="" disabled>
              Selecione o estado
            </option>
            {estadosSiglas.map((sigla, index) => (
              <option key={index} value={sigla}>
                {sigla}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Cidade</label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            placeholder="Sua cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
      </div>

      {/* Botão */}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary mt-3">
          Criar Conta
        </button>
      </div>

      <div className="text-center mt-3">
        <small>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </small>
      </div>
    </form>
  );
};

export default Cadastro;
