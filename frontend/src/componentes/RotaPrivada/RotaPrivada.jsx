import { Navigate } from "react-router-dom";
import { estaLogado } from "../../utilidades/autenticar";

const RotaPrivada = ({ children }) => {
  if (!estaLogado()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RotaPrivada;
