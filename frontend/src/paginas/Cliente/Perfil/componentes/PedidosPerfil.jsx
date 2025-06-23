import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { formatarPreco } from "../../../../utilidades/formatarPreco";
import { formatarData } from "../../../../utilidades/formatarData";

import { usePedidos } from "../../../../contexto/PedidosContexto";
import { useEnderecos } from "../../../../contexto/EnderecosContexto";

const PedidosPerfil = () => {
  const { pedidos, cancelarPedido, carregarPedidos } = usePedidos();
  const { enderecos, carregarEnderecos } = useEnderecos();

  useEffect(() => {
    carregarPedidos();
    carregarEnderecos();
  }, []);

  const cancelar = async (idPedido) => {
    const res = await cancelarPedido(idPedido);
    const { mensagem } = await res.json();
    alert(mensagem);
  };

  console.log(pedidos);

  return (
    <div>
      <h1 className="fw-bold mb-2">Pedidos</h1>

      {pedidos.map((pedido, index) => {
        const total = pedido.itens_pedido.reduce(
          (acc, item) => acc + item.qtde * item.preco_unitario,
          0
        );

        const enderecoPedido = enderecos.find(
          (endereco) => endereco.id_endereco === pedido.id_endereco
        );

        return (
          <div key={index} className="card mb-4">
            <div className="fw-bold pb-3 d-flex justify-content-between">
              <h5>Pedido #{pedido.id_pedido}</h5>
              <p
                style={{
                  color:
                    pedido.status === "Pronto para retirada"
                      ? "#0EA700"
                      : pedido.status === "Realizado"
                      ? "#1c1c1c"
                      : pedido.status === "Aguardando pagamento"
                      ? "#1c1c1c"
                      : pedido.status === "Em separação"
                      ? "#F0DC00"
                      : pedido.status === "Em transporte"
                      ? "#F0DC00"
                      : pedido.status === "Cancelado"
                      ? "#E00000"
                      : "#0EA700",
                }}
              >
                {pedido.status}
              </p>
            </div>

            <div className="row g-0 align-items-start">
              <div className="">
                {pedido.itens_pedido.map((item, idx) => (
                  <div
                    key={idx}
                    className={`d-flex align-items-center gap-5 p-2 ${
                      idx === 0 ? "border-top" : ""
                    }`}
                  >
                    {/* Imagem do produto */}
                    <div className="text-center">
                      <img
                        src={item.produto.imagem}
                        className="rounded border"
                        alt={item.produto.nome}
                        style={{ height: "150px", width: "150px" }}
                      />
                    </div>

                    {/* Informações do produto */}
                    <div className="">
                      <div className="card-body d-flex flex-column">
                        <p className="card-text">
                          <strong>Nome:</strong> {item.produto.nome}
                        </p>
                        <p className="card-text">
                          <strong>Marca:</strong> {item.produto.marca}
                        </p>
                        <p className="card-text">
                          <strong>Quantidade:</strong> {item.qtde}
                        </p>
                        <p className="card-text">
                          <strong>Valor Unitário:</strong>
                          {formatarPreco(item.preco_unitario)}
                        </p>
                        <Link to={`/produto/${item.id_produto}`}>
                          <button className="btn btn-primary mt-2">
                            Ver Produto
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-top pt-3 px-3 d-flex flex-column gap-2 align-items-start">
              {enderecoPedido ? (
                <p>
                  <strong>Endereço de Entrega:</strong>{" "}
                  {`${enderecoPedido.logradouro}, ${enderecoPedido.numero} - ${enderecoPedido.bairro} - ${enderecoPedido.cidade}, ${enderecoPedido.estado}`}
                </p>
              ) : (
                <p>
                  <strong>Endereço de Entrega:</strong> Endereço excluído
                </p>
              )}

              <p>
                <strong>Data de realização: </strong>{" "}
                {formatarData(pedido.data_pedido)}
              </p>

              <p>
                <strong>Total do Pedido:</strong> {formatarPreco(total)}
              </p>

              {pedido.status !== "Cancelado" && (
                <button
                  onClick={() => cancelar(pedido.id_pedido)}
                  className="btn btn-cancelar"
                >
                  Cancelar Pedido
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PedidosPerfil;
