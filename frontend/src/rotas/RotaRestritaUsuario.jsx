import { Navigate } from "react-router-dom";
import { useAutenticacao } from "../contexto/AutenticarContexto";

const RotaRestritaUsuario = ({ children }) => {
  const { usuario } = useAutenticacao();

  if (usuario) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
};

export default RotaRestritaUsuario;
