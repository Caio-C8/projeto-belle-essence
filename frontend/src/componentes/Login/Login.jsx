import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contexto/AutenticarContexto";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login: loginContexto } = useAutenticacao(); // usa o login do contexto

  const login = async (e) => {
    e.preventDefault();

    const usuario = { email, senha };

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    const dados = await res.json();

    if (res.ok) {
      localStorage.setItem("token", dados.token);

      // ⚠️ Importante: atualiza o contexto
      loginContexto(dados.token);

      alert(dados.mensagem);
      navigate("/");
    } else {
      alert(dados.mensagem);
    }
  };

  return (
    <form onSubmit={login}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>senha:</label>
        <input
          type="password"
          value={senha}
          autoComplete="off"
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default Login;
