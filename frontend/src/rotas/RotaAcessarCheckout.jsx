import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import { useCarrinho } from "../contexto/CarrinhoContexto";

const RotaAcessarCheckout = ({ children }) => {
  const { produtosCarrinho, carregarCarrinho } = useCarrinho();

  useEffect(() => {
    carregarCarrinho();
  });

  if (!produtosCarrinho.length) {
    return <Navigate to="/carrinho" replace />;
  }

  return children;
};

export default RotaAcessarCheckout;
