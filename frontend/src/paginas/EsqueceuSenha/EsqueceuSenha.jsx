import React, { useState } from "react";
import "./EsqueceuSenha.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../componentes/Campos/Input";
import InputSenha from "../../componentes/Campos/InputSenha";
import { validarEmail, validarSenha } from "../../utilidades/validadores";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  const alterarSenha = async (e) => {
    e.preventDefault();

    if (!email || !senha || !confirmarSenha)
      return alert("Preencha todos os campos.");

    const erroEmail = validarEmail(email);
    if (!erroEmail) return alert("E-mail inválido");

    const erroSenha = validarSenha(senha);
    if (!erroSenha)
      return alert(
        "Senha deve conter no mínimo 8 caracteres, 1 letra, 1 símbolo e 1 número."
      );

    if (senha !== confirmarSenha)
      return alert("As senhas digitadas são diferentes.");

    try {
      const res = await fetch(`http://localhost:3000/alterar-senha/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, confirmarSenha }),
      });

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
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
    <form onSubmit={alterarSenha} className="card shadow mx-auto">
      <h2 className="text-center">Alterar Senha</h2>

      <Input
        label="E-mail"
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputSenha
        label="Senha"
        placeholder="Sua nova senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <InputSenha
        label="Confirmar senha"
        placeholder="Confirme sua nova senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Alterar Senha
        </button>
      </div>

      <div className="text-center mt-3">
        <small>
          <Link to="/login" className="link">
            Voltar para login
          </Link>
        </small>
      </div>
    </form>
  );
};

export default EsqueceuSenha;
