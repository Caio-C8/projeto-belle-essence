import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardProdutoCarrinho from "./componentes/CardProdutoCarrinho";
import { useCarrinho } from "../../contexto/CarrinhoContexto";

const Carrinho = () => {
  const { produtosCarrinho, removerProduto, carregarCarrinho } = useCarrinho();

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return (
    <div className="d-flex flex-column gap-4">
      <h1>Produtos na Sacola</h1>
      {produtosCarrinho.length === 0 ? (
        <h1>Você não possui produtos na sua sacola.</h1>
      ) : (
        produtosCarrinho.map((produto, index) => (
          <CardProdutoCarrinho
            key={index}
            produto={produto}
            onRemover={() => removerProduto(produto.id_produto)}
          />
        ))
      )}

      <Link to="/checkout">
        <button className="btn btn-primary">Realizar Pedido</button>
      </Link>
    </div>
  );
};

export default Carrinho;
