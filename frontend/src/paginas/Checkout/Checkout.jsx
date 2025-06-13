import React, { useState } from "react";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { useEnderecos } from "../../contexto/EnderecosContexto";
import { useCarrinho } from "../../contexto/CarrinhoContexto";
import { useCliente } from "../../contexto/ClienteContexto";

const Checkout = () => {
  const { usuario } = useAutenticacao();
  const { enderecos } = useEnderecos();
  const { idCarrinho, produtosCarrinho } = useCarrinho();
  const { cliente } = useCliente();
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const encaminharWhatsapp = () => {
    const confirmar = window.confirm(
      "Deseja ser redirecionado para o Whatsapp para realizar o pagamento? (A entrega só será feita mediante pagamento)"
    );

    if (!confirmar) return;

    const mensagem = encodeURIComponent(
      `Olá, fiz um pedido!\n\nNº do pedido: 1\n\nItens:\n- 1x Homem Cor.agio, Natura por R$ 199,90\n\nLocal de entrega: Rua, 001 - Bairro - Complemento, Ponto de Referência - Cidade, Estado\n\nTotal do pedido: R$ 199,90`
    );
    const link = `https://wa.me/5538998249365?text=${mensagem}`;
    window.open(link, "_blank");
  };

  const realizarPedido = async (
    idUsuario,
    idEndereco,
    idCarrinho,
    produtosCarrinho
  ) => {
    if (!idEndereco) return alert("Selecione um endereço para entrega.");

    const produtosPedido = produtosCarrinho.map((produto) => {
      console.log("📦 Produto no carrinho:", produto);
      const idProduto = produto.id_produto;
      const qtde = produto.qtde;
      const precoUnitario = produto.promocao
        ? produto.preco_promocao
        : produto.preco;
      return { idProduto, qtde, precoUnitario };
    });

    console.log("🛒 Enviando para o backend:", {
      idUsuario,
      idEndereco,
      idCarrinho,
      produtosPedido,
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
        encaminharWhatsapp();
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

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

      <button
        className="btn btn-primary"
        onClick={() =>
          realizarPedido(
            usuario.id,
            enderecoSelecionado,
            idCarrinho,
            produtosCarrinho
          )
        }
      >
        Finalizar pedido
      </button>
    </div>
  );
};

export default Checkout;
