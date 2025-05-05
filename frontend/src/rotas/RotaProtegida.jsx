import { Navigate } from "react-router-dom";
import { useAutenticacao } from "../contexto/AutenticarContexto";

const RotaProtegida = ({ children, tipo }) => {
  const { usuario, carregando } = useAutenticacao();

  if (carregando) return <p>Carregando...</p>;

  if (!usuario) return <Navigate to="/login" />;
  if (tipo && usuario.tipo !== tipo) return <Navigate to="/login" />;

  return children;
};

export default RotaProtegida;
