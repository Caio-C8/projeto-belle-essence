import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EsqueceuSenha.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validarEmail, validarSenha } from "../../utilidades/validadores";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aparecerSenha, setAparecerSenha] = useState(false);
  const [aparecerConfirmarSenha, setAparecerConfirmarSenha] = useState(false);
  const navigate = useNavigate();

  const mostrarSenha = () => {
    setAparecerSenha((valorAnterior) => !valorAnterior);
  };

  const mostrarConfirmarSenha = () => {
    setAparecerConfirmarSenha((valorAnterior) => !valorAnterior);
  };

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

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          className="form-control"
          placeholder="Seu e-mail"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Senha</label>
        <div className="input-group">
          <input
            type={aparecerSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="off"
            className="form-control"
            placeholder="Sua senha"
          />
          <span className="input-group-text" onClick={mostrarSenha}>
            <i>
              <FontAwesomeIcon icon={aparecerSenha ? faEyeSlash : faEye} />
            </i>
          </span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Confirmar senha</label>
        <div className="input-group">
          <input
            type={aparecerConfirmarSenha ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            autoComplete="off"
            className="form-control"
            placeholder="Confirme sua senha"
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

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Alterar Senha
        </button>
      </div>

      <div className="text-center mt-3">
        <small>
          <Link to={"/login"}>Voltar para login</Link>
        </small>
      </div>
    </form>
  );
};

export default EsqueceuSenha;
