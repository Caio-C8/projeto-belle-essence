import React, { useState } from "react";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { useEnderecos } from "../../contexto/EnderecosContexto";
import { useCarrinho } from "../../contexto/CarrinhoContexto";
import { useCliente } from "../../contexto/ClienteContexto";

const Checkout = () => {
  const { usuario } = useAutenticacao();
  const { enderecos } = useEnderecos();
  const { produtosCarrinho } = useCarrinho();
  const { cliente } = useCliente();
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const encaminharWhatsapp = () => {
    const confirmar = window.confirm(
      "O seu pedido foi registrado. Deseja ser redirecionado para o Whatsapp para ser atendido?"
    );

    if (!confirmar) return;

    const mensagem = encodeURIComponent(``);
    const link = `https://wa.me/5538998249365`;
    window.open(link, "_blank");
  };

  const realizarPedido = () => {
    encaminharWhatsapp();
    alert(
      "O seu pedido foi registrado com sucesso. Para ver seus pedidos, confira seu perfil."
    );
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

      <button className="btn btn-primary" onClick={realizarPedido}>
        Finalizar pedido
      </button>
    </div>
  );
};

export default Checkout;
