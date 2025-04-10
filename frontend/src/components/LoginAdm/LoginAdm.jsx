import React, { use, useState } from "react";

const LoginAdm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const usuario = { email, senha };

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    const texto = await res.text();
    alert(texto);
  };

  return (
    <form onSubmit={login}>
      <label>Email:</label>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>senha:</label>
      <input
        value={senha}
        type="password"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button type="submit">login</button>
    </form>
  );
};

export default LoginAdm;
