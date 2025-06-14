import { createContext, useContext, useEffect, useState } from "react";
import { useAutenticacao } from "./AutenticarContexto";
import { fetchApiPorId } from "../../api/requisicoes";

const PedidosContexto = createContext();

export const ProvedorPedidos = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = async () => {
    if (!usuario) {
      setPedidos([]);
      return;
    }

    try {
      const dados = await fetchApiPorId("informacoes-pedidos", usuario.id);
      setPedidos(dados);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, [usuario]);

  const realizarPedido = async (
    idUsuario,
    idEndereco,
    idCarrinho,
    produtosCarrinho
  ) => {
    if (!idEndereco) {
      alert("Selecione um endereço para entrega.");
      return;
    }

    const produtosPedido = produtosCarrinho.map((produto) => {
      const idProduto = produto.id_produto;
      const qtde = produto.qtde;
      const precoUnitario = produto.promocao
        ? produto.preco_promocao
        : produto.preco;
      return { idProduto, qtde, precoUnitario };
    });

    try {
      const res = await fetch("http://localhost:3000/realizar-pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario,
          idEndereco,
          idCarrinho,
          produtosPedido,
        }),
      });

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
        carregarPedidos();
        return true;
      } else {
        alert(mensagem);
        return false;
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
      return false;
    }
  };

  const cancelarPedido = async (idPedido) => {
    try {
      const res = await fetch("http://localhost:3000/cancelar-pedido", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idPedido }),
      });

      return res;
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  const contexto = {
    pedidos,
    carregarPedidos,
    realizarPedido,
    cancelarPedido,
  };

  return (
    <PedidosContexto.Provider value={contexto}>
      {children}
    </PedidosContexto.Provider>
  );
};

export const usePedidos = () => useContext(PedidosContexto);
