import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatarPreco } from '../../../utilidades/formatarPreco';

import { useAutenticacao } from '../../../contexto/AutenticarContexto';
import { useEnderecos } from '../../../contexto/EnderecosContexto';
import { useCarrinho } from '../../../contexto/CarrinhoContexto';
import { useCliente } from '../../../contexto/ClienteContexto';
import { usePedidos } from '../../../contexto/PedidosContexto';

const estilos = {
  bordaDestaque: {
    border: '2px solid #ffb4a2',
  },
};

const ResumoCompra = ({ produtos, frete, valorTotal }) => {
  const valorTotalComFrete = valorTotal + frete;

  return (
    <div className='border rounded p-4 d-flex flex-column gap-3 shadow-sm'>
      <h2 className='h4'>Resumo da Compra</h2>
      <div
        className='d-flex flex-column gap-3'
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {produtos.map((p) => (
          <div
            key={p.id_produto || p.nome}
            className='d-flex gap-3 align-items-center'
          >
            <img
              src={p.imagem || 'https://via.placeholder.com/80'}
              alt={p.nome}
              className='rounded'
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
            <div className='flex-grow-1'>
              <h6 className='mb-0 small fw-bold'>{p.nome}</h6>
              <p className='text-muted mb-1 small'>{p.marca || 'Marca'}</p>
            </div>
            <p className='fw-bold mb-0 small'>
              {formatarPreco(p.promocao ? p.preco_promocao : p.preco)}
            </p>
          </div>
        ))}
      </div>
      <hr className='my-1' />
      <div className='d-flex justify-content-between'>
        <p className='mb-0'>Frete</p>
        <p className='mb-0 fw-bold'>{formatarPreco(frete)}</p>
      </div>
      <hr className='my-1' />
      <div className='d-flex justify-content-between'>
        <h5 className='mb-0'>Valor Total</h5>
        <h5 className='mb-0 fw-bold'>{formatarPreco(valorTotalComFrete)}</h5>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { usuario } = useAutenticacao();
  const { enderecos } = useEnderecos();
  const { idCarrinho, produtosCarrinho, esvaziarCarrinho, carregarCarrinho } =
    useCarrinho();
  const { cliente, carregarCliente } = useCliente();
  const { realizarPedido } = usePedidos();
  const navigate = useNavigate();

  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [frete] = useState(10);

  const valorSubTotal = produtosCarrinho.reduce((acc, p) => {
    const precoUnit = p.promocao ? p.preco_promocao : p.preco;
    return acc + precoUnit * p.qtde;
  }, 0);

  const valorTotal = valorSubTotal + frete;

  useEffect(() => {
    carregarCarrinho();
    carregarCliente();
  }, []);

  useEffect(() => {
    if (enderecos.length > 0 && !enderecoSelecionado) {
      setEnderecoSelecionado(enderecos[0].id_endereco);
    }
  }, [enderecos, enderecoSelecionado]);

  const finalizarPedido = async () => {
    if (!enderecoSelecionado) {
      alert('Por favor, selecione um endereço de entrega.');
      return;
    }

    const { sucesso } = await realizarPedido(
      usuario.id,
      enderecoSelecionado,
      idCarrinho,
      produtosCarrinho
    );

    if (sucesso) {
      alert('Pedido finalizado com sucesso!');
      navigate('/perfil?aba=pedidos');
      await esvaziarCarrinho();
    }
  };

  return (
    <div className='container py-5'>
      <div className='row g-5'>
        <div className='col-md-7'>
          <div className='d-flex flex-column gap-5'>
            <section className='d-flex flex-column gap-3'>
              <h2>Endereço da Entrega</h2>
              {enderecos.length > 0 ? (
                enderecos.map((end) => (
                  <div
                    key={end.id_endereco}
                    className='border rounded p-3'
                    style={{
                      ...{
                        cursor: 'pointer',
                      },
                      ...(enderecoSelecionado === end.id_endereco
                        ? estilos.bordaDestaque
                        : {}),
                    }}
                    onClick={() => setEnderecoSelecionado(end.id_endereco)}
                  >
                    <div className='form-check mb-2'>
                      <input
                        type='radio'
                        className='form-check-input'
                        id={`endereco-${end.id_endereco}`}
                        name='endereco'
                        value={end.id_endereco}
                        checked={enderecoSelecionado === end.id_endereco}
                        onChange={() => setEnderecoSelecionado(end.id_endereco)}
                      />
                      <label
                        className='form-check-label w-100'
                        htmlFor={`endereco-${end.id_endereco}`}
                      >
                        <h5 className='mb-1'>
                          {end.logradouro}, {end.numero}
                        </h5>
                        <p className='mb-0 text-muted'>
                          {end.bairro} – CEP {end.cep} – {end.cidade} –{' '}
                          {end.estado}
                        </p>
                        <p className='mb-0 text-muted'>
                          {end.tipo} – {cliente.nome} {cliente.sobrenome}
                        </p>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <p>Você não possui endereços cadastrados.</p>
              )}
              <button
                className='btn btn-outline-primary  w-100'
                onClick={() => navigate('/perfil?aba=enderecos')}
              >
                Usar Outro Endereço
              </button>
            </section>

            <section className='d-flex flex-column gap-3'>
              <h2>Realizar Pagamento</h2>
              <div className='border rounded p-3'>
                <h4 className='fw-bold'>{formatarPreco(valorTotal)}</h4>
                <ol className='ps-3 text-muted small'>
                  <li className='mb-2'>
                    Após a finalização do pedido, abra o app ou banco de sua
                    preferência. Escolha a opção pagar com código Pix "copia e
                    cola", ou código QR.
                  </li>
                  <li className='mb-2'>
                    Copie e cole o código, ou escaneie o código QR com a câmera
                    do seu celular. Confira todas as informações e autorize o
                    pagamento.
                  </li>
                  <li>
                    Você vai receber a confirmação de pagamento no seu e-mail e
                    através dos nossos canais. E pronto!
                  </li>
                </ol>
              </div>
              <button
                className='btn btn-outline-primary w-100'
                onClick={finalizarPedido}
                disabled={!enderecoSelecionado || produtosCarrinho.length === 0}
              >
                Finalizar pedido
              </button>
            </section>
          </div>
        </div>

        <div className='col-md-5'>
          <ResumoCompra
            produtos={produtosCarrinho}
            frete={frete}
            valorTotal={valorSubTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
