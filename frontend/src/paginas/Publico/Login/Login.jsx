import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAutenticacao } from "../../../contexto/AutenticarContexto";

import Input from "../../../componentes/Campos/Input";
import InputSenha from "../../../componentes/Campos/InputSenha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login: loginContexto } = useAutenticacao();

  const login = async (e) => {
    e.preventDefault();

    if (!email || !senha) return alert("Preencha todos os campos.");

    const usuario = { email, senha };
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const { mensagem, dados } = await res.json();

      if (res.ok) {
        localStorage.setItem("token", dados);

        loginContexto(dados);

        alert(mensagem);
        navigate("/");
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <form
      onSubmit={login}
      className="card shadow mx-auto"
      style={{ maxWidth: "800px" }}
    >
      <h2 className="text-center">Acessar Conta</h2>

      <div className="d-flex flex-column gap-3">
        <Input
          label="E-mail:"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
          inputRef={null}
        />

        <InputSenha
          label="Senha:"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className=""
        />

        <div className="d-grid mt-3">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>
      </div>

      <div className="text-center mt-3">
        <small>
          <Link to={"/alterar-senha"} className="link">
            Esqueceu sua senha?
          </Link>
        </small>
        <br />
        <small>
          Não tem uma conta?{" "}
          <Link to={"/cadastro"} className="link">
            Cadastre-se
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Login;
