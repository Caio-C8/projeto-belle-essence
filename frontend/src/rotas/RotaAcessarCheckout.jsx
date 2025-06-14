// src/rotas/RotaCheckoutPermitido.jsx
import { Navigate } from "react-router-dom";
import { useCarrinho } from "../contexto/CarrinhoContexto";

const RotaAcessarCheckout = ({ children }) => {
  const { produtosCarrinho } = useCarrinho();

  if (!produtosCarrinho.length) {
    return <Navigate to="/carrinho" replace />;
  }

  return children;
};

export default RotaAcessarCheckout;
