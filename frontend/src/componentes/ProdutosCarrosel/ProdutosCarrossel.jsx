import React, { useState } from "react";
import "./ProdutosCarrossel.css";
import { Link } from "react-router-dom";
import CardProduto from "../CardProduto/CardProduto";

const ProdutosCarrossel = ({ titulo, produtos, rota }) => {
  const [indiceInicial, setIndiceInicial] = useState(0);
  const itensPorPagina = 4;

  const totalItens = produtos.length > 8 ? 8 : produtos.length;
  const mostrarControles = totalItens > itensPorPagina;

  const indicesInicioValidos = [];
  for (let i = 0; i < totalItens; i += itensPorPagina) {
    if (i + itensPorPagina > totalItens && totalItens > itensPorPagina) {
      const ultimo = totalItens - itensPorPagina;
      if (!indicesInicioValidos.includes(ultimo)) {
        indicesInicioValidos.push(ultimo);
      }
    } else {
      indicesInicioValidos.push(i);
    }
  }

  const avancar = () => {
    const indexAtual = indicesInicioValidos.indexOf(indiceInicial);
    const proximo = Math.min(indexAtual + 1, indicesInicioValidos.length - 1);
    setIndiceInicial(indicesInicioValidos[proximo]);
  };

  const voltar = () => {
    const indexAtual = indicesInicioValidos.indexOf(indiceInicial);
    const anterior = Math.max(indexAtual - 1, 0);
    setIndiceInicial(indicesInicioValidos[anterior]);
  };

  const produtosVisiveis = produtos.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  return (
    <div
      className="container py-4 px-4"
      style={{ border: "1px solid #1c1c1c", borderRadius: "10px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">{titulo}</h2>
        <Link to={rota} className="link">
          Ver mais
        </Link>
      </div>

      <div className="position-relative">
        <div className="d-flex transition-wrapper">
          {produtosVisiveis.map((produto, index) => (
            <CardProduto key={index} produto={produto} />
          ))}
        </div>

        {mostrarControles && (
          <div className="d-flex flex-row align-items-center justify-content-center gap-2 mt-4">
            <button
              className="btn btn-outline-secondary btn-indicador"
              onClick={voltar}
              disabled={indiceInicial === indicesInicioValidos[0]}
            >
              &lt;
            </button>

            <div className="d-flex justify-content-center align-items-center gap-2">
              {indicesInicioValidos.map((valor, index) => (
                <button
                  key={index}
                  className={`carousel-indicator-btn ${
                    valor === indiceInicial ? "active" : ""
                  }`}
                  onClick={() => setIndiceInicial(valor)}
                  aria-label={`Página ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="btn btn-outline-secondary btn-indicador"
              onClick={avancar}
              disabled={
                indiceInicial ===
                indicesInicioValidos[indicesInicioValidos.length - 1]
              }
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdutosCarrossel;
