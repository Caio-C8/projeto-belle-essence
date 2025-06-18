import { Navigate } from "react-router-dom";

import { useAutenticacao } from "../contexto/AutenticarContexto";

const RotaApenasNaoLogado = ({ children }) => {
  const { usuario } = useAutenticacao();

  if (usuario) {
    if (usuario.tipo === "cliente") return <Navigate to="/perfil" replace />;
    if (usuario.tipo === "admin") return <Navigate to="/adm/" replace />;
  }

  return children;
};

export default RotaApenasNaoLogado;
