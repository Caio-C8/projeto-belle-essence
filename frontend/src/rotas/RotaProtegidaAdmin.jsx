import { Navigate } from "react-router-dom";
import { useAutenticacao } from "../contexto/AutenticarContexto";

const RotaProtegidaAdmin = ({ children }) => {
  const { usuario, carregando } = useAutenticacao();

  if (carregando) return <p>Carregando...</p>;

  if (!usuario || usuario.tipo !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RotaProtegidaAdmin;
