import React, { useState, useEffect } from "react";
import "./FiltrosProdutos.css";

const FiltrosProdutos = ({ filtros, filtrosAtivos, onFiltrosChange }) => {
  const [filtrosLocais, setFiltrosLocais] = useState(filtrosAtivos);

  useEffect(() => {
    setFiltrosLocais(filtrosAtivos);
  }, [filtrosAtivos]);

  if (!filtros) return null;

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

  return (
    <div className="filtros-produtos">
      <h5>Filtrar por:</h5>
      <div className="filtros-container">
        {/* Filtro Marca */}
        <div className="filtro-item">
          <label htmlFor="marca">Marca:</label>
          <select
            id="marca"
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

        {/* Filtro Família Olfativa */}
        <div className="filtro-item">
          <label htmlFor="familia_olfativa">Família Olfativa:</label>
          <select
            id="familia_olfativa"
            value={filtrosLocais.familia_olfativa}
            onChange={(e) => handleFiltroChange("familia_olfativa", e.target.value)}
          >
            <option value="">Todas as famílias</option>
            {filtros.familias_olfativas?.map((familia, index) => (
              <option key={index} value={familia}>
                {familia}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro Concentração */}
        <div className="filtro-item">
          <label htmlFor="concentracao">Concentração:</label>
          <select
            id="concentracao"
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

        {/* Filtro Preço */}
        <div className="filtro-item">
          <label htmlFor="preco">Faixa de Preço:</label>
          <select
            id="preco"
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

        {/* Botão Limpar Filtros */}
        <div className="filtro-item">
          <button className="btn-limpar-filtros" onClick={limparFiltros}>
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosProdutos;

