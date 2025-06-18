import React from "react";

const ImagensCarrossel = () => {
  return (
    <div
      id="meuCarrossel"
      className="carousel slide custom-carousel"
      data-bs-ride="carousel"
    >
      {/* Indicadores */}
      <div className="carousel-indicators custom-indicators">
        {[0, 1, 2, 3].map((index) => (
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
        <div className="carousel-item active">
          <div
            className="d-block w-100"
            style={{ height: "400px", backgroundColor: "#FDD9D3" }}
          ></div>
        </div>
        <div className="carousel-item">
          <div
            className="d-block w-100"
            style={{ height: "400px", backgroundColor: "#f4d19a" }}
          ></div>
        </div>
        <div className="carousel-item">
          <div
            className="d-block w-100"
            style={{ height: "400px", backgroundColor: "#a2c4f4" }}
          ></div>
        </div>
        <div className="carousel-item">
          <div
            className="d-block w-100"
            style={{ height: "400px", backgroundColor: "aquamarine" }}
          ></div>
        </div>
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
