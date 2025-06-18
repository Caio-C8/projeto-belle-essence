import { Navigate } from "react-router-dom";

import { useAutenticacao } from "../contexto/AutenticarContexto";

const RotaPublicaNaoAdmin = ({ children }) => {
  const { usuario } = useAutenticacao();

  if (usuario?.tipo === "admin") {
    return <Navigate to="/adm/" replace />;
  }

  return children;
};

export default RotaPublicaNaoAdmin;
