import React from "react";

import { formatarPreco } from "../../../../utilidades/formatarPreco";

const ResumoCompra = ({ produtos, valorTotal }) => {
  return (
    <div>
      <h2 className="mb-3">Resumo da compra</h2>

      <div className="card">
        <div className="produtos-resumo">
          {produtos.map((p) => (
            <div
              key={p.id_produto}
              className="d-flex align-items-center mb-3 border-bottom pb-3"
            >
              <div className="produto-imagem me-3">
                <img
                  src={p.imagem || "/placeholder-product.png"}
                  alt={p.nome}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </div>
              <div className="produto-info flex-grow-1">
                <h6 className="mb-1">{p.nome}</h6>
                <p className="text-muted mb-0 small">{p.marca || "Marca"}</p>
                <p className="text-muted mb-0 small">Qtd: {p.qtde}</p>
              </div>
              <div className="produto-preco">
                <span className="fw-bold">
                  {formatarPreco(p.promocao ? p.preco_promocao : p.preco)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Valor Total</span>
            <span className="fw-bold">{formatarPreco(valorTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumoCompra;
