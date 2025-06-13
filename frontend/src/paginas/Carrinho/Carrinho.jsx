import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardProdutoCarrinho from './componentes/CardProdutoCarrinho';
import { useCarrinho } from '../../contexto/CarrinhoContexto';

const Carrinho = () => {
  const { produtosCarrinho, removerProduto, carregarCarrinho } = useCarrinho();

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const subtotal = 300;
  const frete = 10;
  const total = subtotal + frete;

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-8 d-flex flex-column gap-3'>
          <h1>Produtos na Sacola</h1>
          {!produtosCarrinho.length ? (
            <h4>Você não possui produtos na sua sacola.</h4>
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

        <div className='col-md-4'>
          <div className='border p-4 rounded shadow-sm bg-light'>
            <h4 className='mb-4'>Resumo da Compra</h4>
            <div className='d-flex justify-content-between'>
              <span>Subtotal ({produtosCarrinho.length} produtos)</span>
              <strong>R$ {subtotal.toFixed(2)}</strong>
            </div>
            <div className='d-flex justify-content-between mt-2'>
              <div>
                <span>Frete</span>
                <small className='d-block text-muted'>
                  Chega em até 10 dias
                </small>
              </div>
              <strong>R$ {frete.toFixed(2)}</strong>
            </div>
            <hr className='my-3' />
            <div className='d-flex justify-content-between'>
              <span className='fw-bold'>Valor Total</span>
              <strong className='text-success'>R$ {total.toFixed(2)}</strong>
            </div>
            <Link to='/checkout' className='btn btn-primary w-100 mt-4'>
              Finalizar Compra
            </Link>
            <Link to='/produtos' className='btn btn-outline-primary w-100 mt-2'>
              Escolher Mais Produtos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
