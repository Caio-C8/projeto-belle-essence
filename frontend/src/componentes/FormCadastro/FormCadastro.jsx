import React, { useState } from "react";
import { useMask } from "@react-input/mask";
import "./FormCadastro.css";
import { validarCamposCadastro } from "../../utilidades/validadores";

const FormCadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
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
    <form onSubmit={cadastrarUsuario}>
      <div>
        <label>Email:</label>
        <input
          value={email}
          type="text"
          inputMode="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Senha:</label>
        <input
          value={senha}
          type="password"
          autoComplete="off"
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <div>
        <label>Nome:</label>
        <input
          value={nome}
          type="text"
          autoComplete="off"
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label>Sobernome:</label>
        <input
          value={sobrenome}
          type="text"
          autoComplete="off"
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>

      <div>
        <label>Celular:</label>
        <input
          ref={maskCelular}
          value={celular}
          type="text"
          autoComplete="off"
          onChange={(e) => setCelular(e.target.value)}
        />
      </div>

      <div>
        <label>Data Nascimento:</label>
        <input
          value={dataNascimento}
          type="date"
          min="1900-01-01"
          autoComplete="off"
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>

      <div>
        <label>CPF:</label>
        <input
          ref={maskCpf}
          value={cpf}
          type="text"
          autoComplete="off"
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>

      <div>
        <label>CEP:</label>
        <input
          ref={maskCep}
          value={cep}
          type="text"
          onChange={(e) => setCep(e.target.value)}
        />
      </div>

      <div>
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Residencial">Residencial</option>
          <option value="Comercial">Comercial</option>
        </select>
      </div>

      <div>
        <label>Logradouro:</label>
        <input
          value={logradouro}
          type="text"
          onChange={(e) => setLogradouro(e.target.value)}
        />
      </div>

      <div>
        <label>Número:</label>
        <input
          ref={maskNumero}
          value={numero}
          type="text"
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>

      <div>
        <label>Complemento:</label>
        <input
          value={complemento}
          type="text"
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>

      <div>
        <label>Bairro:</label>
        <input
          value={bairro}
          type="text"
          onChange={(e) => setBairro(e.target.value)}
        />
      </div>

      <div>
        <label>Ponto de Referência:</label>
        <input
          value={pontoReferencia}
          type="text"
          onChange={(e) => setPontoReferencia(e.target.value)}
        />
      </div>

      <div>
        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Selecione</option>
          {estadosSiglas.map((sigla, index) => (
            <option key={index} value={sigla}>
              {sigla}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cidade:</label>
        <input
          value={cidade}
          type="text"
          onChange={(e) => setCidade(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default FormCadastro;
