import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { fetchApiPorId } from "../../../api/requisicoes";

const Checkout = () => {
  const { usuario } = useAutenticacao();
  const idUsuario = usuario.id;
  const [cliente, setCliente] = useState([]);
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const dadosEnderecos = await fetchApiPorId("enderecos", idUsuario);
      const dadosCliente = await fetchApiPorId("clientes", idUsuario);
      const itensCarrinho = await fetchApiPorId("itens-carrinho", idUsuario);

      const produtosDetalhados = await Promise.all(
        itensCarrinho.map(async (item) => {
          const produto = await fetchApiPorId("produtos", item.id_produto);
          return { ...produto, qtde: item.qtde };
        })
      );

      setProdutosCarrinho(produtosDetalhados);

      setEnderecos(dadosEnderecos || []);
      setCliente(dadosCliente || []);
    };

    carregarDados();
  });

  return (
    <div className="d-flex flex-column gap-5">
      <div>
        <h2>Produtos Selecionados</h2>

        <div className="d-flex flex-column gap-3">
          {produtosCarrinho.map((produto, index) => (
            <div key={index}>
              <h4>{produto.nome}</h4>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Endereços</h2>

        {enderecos.length > 0 ? (
          enderecos.map((endereco) => (
            <div
              key={endereco.id_endereco}
              className="d-flex align-items-center p-3 mb-3 rounded border"
              style={{ backgroundColor: "#f6fffa" }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="endereco"
                  id={`endereco-${endereco.id_endereco}`}
                  value={endereco.id_endereco}
                  checked={enderecoSelecionado === endereco.id_endereco}
                  onChange={() => setEnderecoSelecionado(endereco.id_endereco)}
                />
              </div>
              <div className="ms-3">
                <h5 className="mb-1">
                  {`${endereco.logradouro}, ${endereco.numero}`}
                </h5>
                <p className="mb-0">
                  {`${endereco.bairro} - CEP ${endereco.cep} - ${endereco.cidade} - ${endereco.estado}`}
                </p>
                <p className="mb-0">
                  {`${endereco.tipo} - ${cliente.nome} ${cliente.sobrenome}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Você não possui endereços cadastrados.</p>
        )}
      </div>

      <a href="https://wa.me/5538998249365" target="_blank">
        <button className="btn btn-primary">Finalizar pedido</button>
      </a>
    </div>
  );
};

export default Checkout;
