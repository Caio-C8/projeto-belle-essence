import React, { useState } from "react";
import { useMask } from "@react-input/mask";
import "./FormCadastro.css";
import { validarCamposCadastro } from "../../utilidades/validadores";

const FormCadastroAdm = () => {
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

    try {
      const response = await fetch("http://localhost:3000/cadastro-usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setEmail("");
        setSenha("");
        setNome("");
        setSobrenome("");
        setCelular("");
        setDataNascimento("");
        setCpf("");
      } else {
        alert("Erro ao cadastrar usuário");
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
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default FormCadastroAdm;
