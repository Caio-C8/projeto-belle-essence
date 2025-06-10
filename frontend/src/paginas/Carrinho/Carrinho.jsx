import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { fetchApiPorId } from "../../../api/requisicoes";
import CardProdutoCarrinho from "./componentes/CardProdutoCarrinho";

const Carrinho = () => {
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const { usuario } = useAutenticacao();
  const idUsuario = usuario.id;

  useEffect(() => {
    const carregarDados = async () => {
      const itensCarrinho = await fetchApiPorId("itens-carrinho", idUsuario);

      const produtosDetalhados = await Promise.all(
        itensCarrinho.map(async (item) => {
          const produto = await fetchApiPorId("produtos", item.id_produto);
          return { ...produto, qtde: item.qtde };
        })
      );

      setProdutosCarrinho(produtosDetalhados);
    };

    carregarDados();
  }, [idUsuario]);

  const atualizarProdutosCarrinho = (idProduto) => {
    setProdutosCarrinho((produtos) =>
      produtos.filter((produto) => produto.id_produto !== idProduto)
    );
  };

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
            atualizarProdutosCarrinho={atualizarProdutosCarrinho}
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
