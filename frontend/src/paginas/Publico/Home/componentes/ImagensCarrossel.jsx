import React from "react";
import { Link } from "react-router-dom";

const ImagensCarrossel = ({ produtos }) => {
  if (!produtos || produtos.length === 0) return null;

  return (
    <div
      id="meuCarrossel"
      className="carousel slide custom-carousel"
      data-bs-ride="carousel"
      style={{ height: "550px" }}
    >
      {/* Indicadores */}
      <div className="carousel-indicators custom-indicators">
        {produtos.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#meuCarrossel"
            data-bs-slide-to={index}
            className={index === 0 ? "indicator active" : "indicator"}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {produtos.map((produto, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <Link to={`/produto/${produto.id_produto}`}>
              <img
                src={produto.banner}
                alt={produto.nome}
                className="d-block w-100"
                style={{ height: "550px", objectFit: "cover" }}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Botões */}
      <button
        className="carousel-control-prev custom-control"
        type="button"
        data-bs-target="#meuCarrossel"
        data-bs-slide="prev"
      >
        <span className="custom-arrow">&#10094;</span>
      </button>
      <button
        className="carousel-control-next custom-control"
        type="button"
        data-bs-target="#meuCarrossel"
        data-bs-slide="next"
      >
        <span className="custom-arrow">&#10095;</span>
      </button>
    </div>
  );
};

export default ImagensCarrossel;
