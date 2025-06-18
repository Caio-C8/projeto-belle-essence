import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { formatarPreco } from "../../../utilidades/formatarPreco";

import { useCarrinho } from "../../../contexto/CarrinhoContexto";

import CardProdutoCarrinho from "./componentes/CardProdutoCarrinho";

const Carrinho = () => {
  const { produtosCarrinho, removerProduto, carregarCarrinho } = useCarrinho();

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const subtotal = produtosCarrinho.reduce((acc, produto) => {
    const precoUnitario = produto.promocao
      ? produto.preco_promocao
      : produto.preco;
    return acc + precoUnitario * produto.qtde;
  }, 0);
  // const frete = 10;
  const total = subtotal;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 d-flex flex-column gap-3">
          <h2>Produtos na Sacola</h2>
          {!produtosCarrinho.length ? (
            <div className="d-flex justify-content-center">
              <h3>Você não possui produtos na sua sacola.</h3>
            </div>
          ) : (
            produtosCarrinho.map((produto, index) => (
              <CardProdutoCarrinho
                key={index}
                produto={produto}
                onRemover={() => removerProduto(produto.id_produto)}
              />
            ))
          )}
        </div>

        <div className="col-md-4 d-flex flex-column gap-3">
          <h2>Resumo da Compra</h2>
          <div className="border p-4" style={{ borderRadius: "10px" }}>
            <div className="d-flex justify-content-between">
              <span>Subtotal ({produtosCarrinho.length} produtos)</span>
              {subtotal === 0 ? (
                <strong>-</strong>
              ) : (
                <strong>{formatarPreco(subtotal)}</strong>
              )}
            </div>
            {/* <div className="d-flex justify-content-between mt-2">
              <div>
                <span>Frete</span>
              </div>
              <strong>{formatarPreco(frete)}</strong>
            </div> */}
            <hr className="my-3" />
            <div className="d-flex justify-content-between">
              <span>Valor Total</span>
              {total === 0 ? (
                <strong>-</strong>
              ) : (
                <strong>{formatarPreco(total)}</strong>
              )}
            </div>
            <Link to="/checkout" className="btn btn-primary w-100 mt-4">
              Finalizar Compra
            </Link>
            <Link to="/pesquisa" className="btn btn-outline-primary w-100 mt-2">
              Escolher Mais Produtos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
