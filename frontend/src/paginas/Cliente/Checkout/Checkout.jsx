import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatarPreco } from "../../../utilidades/formatarPreco";

import { useAutenticacao } from "../../../contexto/AutenticarContexto";
import { useEnderecos } from "../../../contexto/EnderecosContexto";
import { useCarrinho } from "../../../contexto/CarrinhoContexto";
import { useCliente } from "../../../contexto/ClienteContexto";
import { usePedidos } from "../../../contexto/PedidosContexto";

import EnderecoEntrega from "./componentes/EnderecosEntrega";
import ResumoCompra from "./componentes/ResumoCompra";

const Checkout = () => {
  const { usuario } = useAutenticacao();
  const { enderecos, carregarEnderecos } = useEnderecos();
  const { idCarrinho, produtosCarrinho, esvaziarCarrinho, carregarCarrinho } =
    useCarrinho();
  const { cliente, carregarCliente } = useCliente();
  const { realizarPedido } = usePedidos();
  const navigate = useNavigate();

  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const valorTotal = produtosCarrinho.reduce((acc, p) => {
    const precoUnit = p.promocao ? p.preco_promocao : p.preco;
    return acc + precoUnit * p.qtde;
  }, 0);

  useEffect(() => {
    carregarEnderecos();
    carregarCarrinho();
    carregarCliente();
  }, []);

  useEffect(() => {
    if (enderecos.length > 0 && !enderecoSelecionado) {
      setEnderecoSelecionado(enderecos[0].id_endereco);
    }
  }, [enderecos, enderecoSelecionado]);

  const encaminharWhatsapp = (
    produtosCarrinho,
    idPedidoCriado,
    nomeCompleto
  ) => {
    const confirmar = window.confirm(
      "Deseja ser redirecionado para o Whatsapp para realizar o pagamento? (A entrega só será feita mediante pagamento)"
    );

    if (!confirmar) return;

    const endereco = enderecos.find(
      (end) => end.id_endereco === enderecoSelecionado
    );

    const mensagem =
      encodeURIComponent(`Olá, meu nome é ${nomeCompleto} fiz um pedido!\n\nNº do pedido: #${idPedidoCriado}\n\nItens:\n${produtosCarrinho
        .map(
          (produto) =>
            `- ${produto.qtde}x ${produto.nome}, ${produto.marca} por ${
              produto.promocao
                ? formatarPreco(produto.preco_promocao)
                : formatarPreco(produto.preco)
            } a unidade;`
        )
        .join("\n")}\n\nLocal de entrega: ${endereco.logradouro}, ${
        endereco.numero
      } - ${endereco.bairro} - ${endereco.complemento}, ${
        endereco.ponto_referencia
      } - ${endereco.cidade}, ${
        endereco.estado
      }\n\nTotal do pedido: ${formatarPreco(valorTotal)}
      `);

    const link = `https://wa.me/5538998249365?text=${mensagem}`;
    window.open(link, "_blank");
  };

  const finalizarPedido = async () => {
    const { sucesso, idPedidoCriado, nomeCompleto } = await realizarPedido(
      usuario.id,
      enderecoSelecionado,
      idCarrinho,
      produtosCarrinho
    );

    if (sucesso) {
      encaminharWhatsapp(produtosCarrinho, idPedidoCriado, nomeCompleto);
      navigate("/perfil?aba=pedidos");
      await esvaziarCarrinho();
    }
  };

  return (
    <div>
      <div className="row g-5">
        <div className="col-md-7">
          <EnderecoEntrega
            enderecos={enderecos}
            enderecoSelecionado={enderecoSelecionado}
            setEnderecoSelecionado={setEnderecoSelecionado}
            cliente={cliente}
          />

          <section className="d-flex flex-column gap-3">
            <h2>Realizar Pagamento</h2>
            <div className="border rounded p-3">
              <h4 className="fw-bold mb-2">{formatarPreco(valorTotal)}</h4>
              <ol className="ps-3 text-muted small">
                <li className="mb-2">
                  Após você finalizar o pedido, ele será registrado e você será
                  encaminhado para o WhatsApp no número (38) 99824-9365, onde
                  você tera que efetuar o pagamento do pedido. Após o pagamento,
                  enviaremos seus produtos o mais rápido possível! Caso tenha
                  alguma dúvida, entre em contato no WhatsApp.
                </li>
              </ol>
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={finalizarPedido}
              disabled={!enderecoSelecionado || produtosCarrinho.length === 0}
            >
              Finalizar pedido
            </button>
          </section>
        </div>

        <div className="col-md-5">
          <ResumoCompra produtos={produtosCarrinho} valorTotal={valorTotal} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
