import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

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
      alert(dados.mensagem);
      navigate("/carrinho");
    } else {
      alert(dados.mensagem);
    }
  };

  // const testarToken = async () => {
  //   const token = localStorage.getItem("token");

  //   const res = await fetch("http://localhost:3000/teste", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (res.ok) {
  //     const dados = await res.json();
  //     console.log("✅ Token válido, resposta:", dados);
  //     alert("Token válido! Veja o console.");
  //   } else {
  //     const erro = await res.text();
  //     console.error("❌ Erro:", erro);
  //     alert("Token inválido ou expirado.");
  //   }
  // };

  return (
    <>
      <form onSubmit={login}>
        <div>
          <label>Email:</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>senha:</label>
          <input
            value={senha}
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">login</button>
        </div>
      </form>

      {/* <button type="button" onClick={testarToken}>
        Testar Token
      </button> */}
    </>
  );
};

export default Login;
