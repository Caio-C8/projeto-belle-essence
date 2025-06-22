import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { usePedidos } from "../../../../contexto/PedidosContexto";
import { useEnderecos } from "../../../../contexto/EnderecosContexto";

const PedidosPerfil = () => {
  const { pedidos, cancelarPedido, carregarPedidos } = usePedidos();
  const { enderecos, carregarEnderecos } = useEnderecos();

  useEffect(() => {
    carregarPedidos();
    carregarEnderecos();
  });

  const cancelar = async (idPedido) => {
    const res = await cancelarPedido(idPedido);

    const { mensagem } = await res.json();

    if (res.ok) {
      alert(mensagem);
    } else {
      alert(mensagem);
    }
  };

  return (
    <div>
      <h1 className="fw-bold mb-2">Pedidos</h1>
      {pedidos.map((pedido, index) => {
        const total = pedido.itens_pedido.reduce(
          (acc, item) => acc + item.qtde * item.preco_unitario,
          0
        );

        const enderecoPedido = enderecos.filter(
          (endereco) => endereco.id_endereco === pedido.id_endereco
        );

        return (
          <div className="border p-3 mb-2" key={index}>
            <h4 className="mb-2">Pedido #{pedido.id_pedido}</h4>
            {pedido.itens_pedido.map((item, idx) => (
              <div key={idx}>
                <img
                  style={{ height: "100px", width: "100px" }}
                  src={item.produto.imagem}
                  alt={item.produto.nome}
                />
                <p>{`${item.produto.nome} - ${item.qtde}x -  ${item.preco_unitario}`}</p>
                <Link to={`/produto/${item.id_produto}`}>
                  <button className="btn- btn-primary p-1 mb-4">
                    Ver Produto
                  </button>
                </Link>
              </div>
            ))}

            {!enderecoPedido ? (
              <p>Endereço excluído</p>
            ) : (
              <p>
                Endereço do pedido: {enderecoPedido.logradouro},
                {enderecoPedido.numero}
              </p>
            )}

            <p className="fw-bold mt-2">{`Total do pedido: ${total} - Status: ${pedido.status}`}</p>

            {pedido.status === "Cancelado" ? (
              <></>
            ) : (
              <button
                onClick={() => cancelar(pedido.id_pedido)}
                className="btn btn-cancelar"
              >
                Cancelar Pedido
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PedidosPerfil;
