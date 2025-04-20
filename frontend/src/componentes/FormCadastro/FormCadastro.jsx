import React, { useState } from "react";
import "./FormCadastro.css";

const FormCadastroAdm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelualr] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setCelualr("");
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Senha:</label>
        <input
          value={senha}
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <div>
        <label>Nome:</label>
        <input
          value={nome}
          type="text"
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label>Sobernome:</label>
        <input
          value={sobrenome}
          type="text"
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>

      <div>
        <label>Celular:</label>
        <input
          value={celular}
          type="text"
          maxLength={20}
          onChange={(e) => setCelualr(e.target.value)}
        />
      </div>

      <div>
        <label>Data Nascimento:</label>
        <input
          value={dataNascimento}
          type="date"
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>

      <div>
        <label>CPF:</label>
        <input
          value={cpf}
          type="text"
          maxLength={14}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">Cadastrar Administrador</button>
      </div>
    </form>
  );
};

export default FormCadastroAdm;
