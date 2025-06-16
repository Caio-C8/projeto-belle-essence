import React, { useState, useEffect } from "react";
import "./FiltrosProdutos.css";

const FiltrosProdutos = ({ filtros, filtrosAtivos, onFiltrosChange }) => {
  const [filtrosLocais, setFiltrosLocais] = useState({
    marca: "",
    familia_olfativa: "",
    concentracao: "",
    preco: "",
  });

  useEffect(() => {
    setFiltrosLocais(filtrosAtivos);
  }, [filtrosAtivos]);

  const handleFiltroChange = (tipo, valor) => {
    const novosFiltros = {
      ...filtrosLocais,
      [tipo]: valor,
    };
    setFiltrosLocais(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosVazios = {
      marca: "",
      familia_olfativa: "",
      concentracao: "",
      preco: "",
    };
    setFiltrosLocais(filtrosVazios);
    onFiltrosChange(filtrosVazios);
  };

  const temFiltrosAtivos = Object.values(filtrosLocais).some(
    (valor) => valor !== ""
  );

  if (!filtros) return null;

  return (
    <div className="filtros-produtos">
      <div className="filtros-header">
        <h5>Filtros</h5>
        {temFiltrosAtivos && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={limparFiltros}
          >
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="filtros-container">
        {/* Filtro de Marca */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-marca" className="form-label">
            Marca
          </label>
          <select
            id="filtro-marca"
            className="form-select"
            value={filtrosLocais.marca}
            onChange={(e) => handleFiltroChange("marca", e.target.value)}
          >
            <option value="">Todas as marcas</option>
            {filtros.marcas?.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Família Olfativa */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-familia" className="form-label">
            Família Olfativa
          </label>
          <select
            id="filtro-familia"
            className="form-select"
            value={filtrosLocais.familia_olfativa}
            onChange={(e) =>
              handleFiltroChange("familia_olfativa", e.target.value)
            }
          >
            <option value="">Todas as famílias</option>
            {filtros.familias_olfativas?.map((familia, index) => (
              <option key={index} value={familia}>
                {familia}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Concentração */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-concentracao" className="form-label">
            Concentração
          </label>
          <select
            id="filtro-concentracao"
            className="form-select"
            value={filtrosLocais.concentracao}
            onChange={(e) => handleFiltroChange("concentracao", e.target.value)}
          >
            <option value="">Todas as concentrações</option>
            {filtros.concentracoes?.map((concentracao, index) => (
              <option key={index} value={concentracao}>
                {concentracao}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Preço */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-preco" className="form-label">
            Faixa de Preço
          </label>
          <select
            id="filtro-preco"
            className="form-select"
            value={filtrosLocais.preco}
            onChange={(e) => handleFiltroChange("preco", e.target.value)}
          >
            <option value="">Todos os preços</option>
            {filtros.faixas_preco?.map((faixa, index) => (
              <option key={index} value={faixa.slug}>
                {faixa.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosProdutos;
