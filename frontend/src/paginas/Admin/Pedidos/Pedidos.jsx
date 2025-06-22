import React, { useEffect, useState } from "react";

import { usePedidos } from "../../../contexto/PedidosContexto";

import CardPedido from "./componentes/CardPedido";

const Pedidos = () => {
  const { buscarTodosPedidosAdmin } = usePedidos();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const lista = await buscarTodosPedidosAdmin();
      setPedidos(lista || []);
    };
    carregar();
  }, []);

  return (
    <div>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <CardPedido key={pedido.id_pedido} pedido={pedido} />
        ))
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
};

export default Pedidos;
