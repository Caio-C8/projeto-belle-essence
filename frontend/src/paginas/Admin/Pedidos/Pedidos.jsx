import React, { useEffect, useState } from "react";

import { usePedidos } from "../../../contexto/PedidosContexto";
import CardPedido from "./componentes/CardPedido";
import FiltrosProdutos from "../../../componentes/FiltrosProdutos/FiltrosProdutos";

const Pedidos = () => {
  const { buscarTodosPedidosAdmin } = usePedidos();
  const [pedidos, setPedidos] = useState([]);
  const [filtrosAtivos, setFiltrosAtivos] = useState({ status: "" });

  useEffect(() => {
    const carregar = async () => {
      const lista = await buscarTodosPedidosAdmin();
      setPedidos(lista || []);
    };
    carregar();
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (!filtrosAtivos.status) return true;
    return pedido.status === filtrosAtivos.status;
  });

  return (
    <div className="row">
      <div className="col-md-3 mb-4">
        <FiltrosProdutos
          filtros={null}
          filtrosAtivos={filtrosAtivos}
          onFiltrosChange={setFiltrosAtivos}
          configFiltros={[{ tipo: "status", label: "Status do pedido" }]}
          valoresFiltrosPersonalizados={{
            status: [
              "Pronto para retirada",
              "Aguardando pagamento",
              "Em separação",
              "Em transporte",
              "Cancelado",
            ],
          }}
        />
      </div>

      <div className="col-md-9 d-flex flex-column gap-4">
        {pedidosFiltrados.length > 0 ? (
          pedidosFiltrados.map((pedido) => (
            <CardPedido key={pedido.id_pedido} pedido={pedido} />
          ))
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
