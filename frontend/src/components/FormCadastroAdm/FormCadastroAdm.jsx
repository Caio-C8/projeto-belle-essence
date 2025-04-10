import React, { useState } from "react";

const FormCadastroAdm = () => {
  const [emailAdm, setEmailAdm] = useState("");
  const [senhaAdm, setSenhaAdm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const administrador = { emailAdm, senhaAdm };

    try {
      const response = await fetch("http://localhost:3000/administradores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(administrador),
      });

      if (response.ok) {
        alert("Administrador cadastrado com sucesso!");
        setEmailAdm("");
        setSenhaAdm("");
      } else {
        alert("Erro ao cadastrar administrador");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        value={emailAdm}
        type="email"
        onChange={(e) => setEmailAdm(e.target.value)}
      />

      <label>senha:</label>
      <input
        value={senhaAdm}
        type="password"
        onChange={(e) => setSenhaAdm(e.target.value)}
      />

      <button type="submit">Cadastrar Administrador</button>
    </form>
  );
};

export default FormCadastroAdm;
