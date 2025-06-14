import { Navigate } from "react-router-dom";
import { useAutenticacao } from "../contexto/AutenticarContexto";

const RotaAcessarLogin = ({ children }) => {
  const { usuario } = useAutenticacao();

  if (usuario) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
};

export default RotaAcessarLogin;
