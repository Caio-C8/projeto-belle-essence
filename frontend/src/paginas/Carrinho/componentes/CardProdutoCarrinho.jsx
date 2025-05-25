import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatarPreco } from "../../../utilidades/formatarPreco";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useAutenticacao } from "../../../contexto/AutenticarContexto";

const CardProdutoCarrinho = ({ produto, atualizarProdutosCarrinho }) => {
  const [quantidade, setQuantidade] = useState(produto.qtde);
  const { usuario } = useAutenticacao();

  const atualizarQuantidade = async (novaQuantidade) => {
    try {
      const res = await fetch("http://localhost:3000/atualizar-quantidade", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: usuario.id,
          idProduto: produto.id_produto,
          novaQuantidade: novaQuantidade,
        }),
      });

      const dados = await res.json();

      if (res.ok) {
        console.log(dados.mensagem);
      } else {
        alert(dados.mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar quantidade.");
    }
  };

  const aumentar = () => {
    if (quantidade < produto.qtde_estoque) {
      const nova = quantidade + 1;
      atualizarQuantidade(nova);
      setQuantidade(nova);
    }
  };

  const diminuir = () => {
    if (quantidade > 1) {
      const nova = quantidade - 1;
      atualizarQuantidade(nova);
      setQuantidade(nova);
    }
  };

  const retirarProdutoCarrinho = async () => {
    const idProduto = produto.id_produto;
    const idUsuario = usuario.id;

    try {
      const res = await fetch(
        `http://localhost:3000/retirar-produtos-carrinho/${idUsuario}/${idProduto}`,
        {
          method: "DELETE",
        }
      );

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);

        atualizarProdutosCarrinho(idProduto);
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div
      className="d-flex justify-content-between p-2"
      style={{
        width: "60%",
        border: "1px solid #1c1c1c",
        borderRadius: "10px",
      }}
    >
      <div className="p-4" style={{ borderRight: "1px solid #cccccc" }}>
        <img
          src={produto.imagem}
          alt={produto.nome}
          style={{
            border: "1px solid #1c1c1c",
            borderRadius: "10px",
            width: "200px",
          }}
        />
      </div>

      <div className="d-flex flex-column justify-content-between p-4">
        <div>
          <h3>{produto.nome}</h3>
          <h6 className="text-muted">{produto.marca}</h6>
        </div>

        {produto.preco_promocao ? (
          <div>
            <h6 className="text-muted text-decoration-line-through">
              {formatarPreco(produto.preco)}
            </h6>
            <h4>{formatarPreco(produto.preco_promocao)}</h4>
          </div>
        ) : (
          <div>
            <h4>{formatarPreco(produto.preco)}</h4>
          </div>
        )}

        <div className="d-flex align-items-center gap-2">
          <div className="fw-semibold">Quantidade:</div>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={diminuir}
            disabled={quantidade === 1}
          >
            –
          </button>
          <input
            type="text"
            className="form-control form-control-sm text-center"
            style={{ width: "50px" }}
            value={quantidade}
            disabled
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={aumentar}
            disabled={quantidade === produto.qtde_estoque}
          >
            +
          </button>
        </div>
      </div>

      <div className="p-4">
        <button onClick={retirarProdutoCarrinho}>
          <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "2rem" }} />
        </button>
      </div>
    </div>
  );
};

export default CardProdutoCarrinho;
