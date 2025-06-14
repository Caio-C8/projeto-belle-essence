import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatarPreco } from "../../../utilidades/formatarPreco";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useCarrinho } from "../../../contexto/CarrinhoContexto";

const CardProdutoCarrinho = ({ produto, onRemover }) => {
  const [quantidade, setQuantidade] = useState(produto.qtde ?? 1);
  const { atualizarQuantidade } = useCarrinho();

  const aumentar = async () => {
    if (quantidade < produto.qtde_estoque) {
      const nova = quantidade + 1;
      await atualizarQuantidade(produto.id_produto, nova);
      setQuantidade(nova);
    }
  };

  const diminuir = async () => {
    if (quantidade > 1) {
      const nova = quantidade - 1;
      await atualizarQuantidade(produto.id_produto, nova);
      setQuantidade(nova);
    }
  };

  return (
    <div
      className="d-flex justify-content-between p-2 border"
      style={{
        borderRadius: "10px",
      }}
    >
      <div className="p-4 my-2" style={{ borderRight: "1px solid #cccccc" }}>
        <Link to={`/produto/${produto.id_produto}`}>
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{
              border: "1px solid #1c1c1c",
              borderRadius: "10px",
              width: "200px",
            }}
          />
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-between p-4 w-100">
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
            value={quantidade ?? ""}
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
        <button onClick={onRemover}>
          <FontAwesomeIcon
            icon={faTrashCan}
            className="icon"
            style={{ color: "#cccccc", fontSize: "2rem" }}
          />
        </button>
      </div>
    </div>
  );
};

export default CardProdutoCarrinho;
