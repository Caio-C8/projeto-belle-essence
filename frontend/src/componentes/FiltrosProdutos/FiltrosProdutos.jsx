import React, { useState, useEffect } from "react";

const FiltrosProdutos = ({ filtros, filtrosAtivos, onFiltrosChange }) => {
  const [filtrosLocais, setFiltrosLocais] = useState(filtrosAtivos);

  useEffect(() => {
    setFiltrosLocais(filtrosAtivos);
  }, [filtrosAtivos]);

  if (!filtros) return null;

  const handleFiltroClick = (tipo, valor) => {
    const isAlreadySelected = filtrosLocais[tipo] === valor;
    const novosFiltros = {
      ...filtrosLocais,
      [tipo]: isAlreadySelected ? "" : valor, // Toggle: desativa se já selecionado, senão seleciona
    };
    setFiltrosLocais(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  return (
    <aside>
      <h3 className="mb-2 text-center">Filtros</h3>

      {/* Filtro Marca */}
      <div className="filtro-grupo border-top py-2 mb-2">
        <h5 className="mb-2">Marcas:</h5>
        {filtros.marcas?.map((marca, index) => (
          <div className="ps-4 d-flex align-items-center gap-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={marca}
              id={`checkMarca${index}`}
              checked={filtrosLocais.marca === marca}
              onChange={() => handleFiltroClick("marca", marca)}
            />
            <label className="form-check-label" htmlFor={`checkMarca${index}`}>
              {marca}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro Preço */}
      <div className="filtro-grupo border-top mb-2 py-2">
        <h5>Preços:</h5>
        {filtros.faixas_preco?.map((faixa, index) => (
          <div className="ps-4 d-flex align-items-center gap-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={faixa.slug}
              id={`checkPreco${index}`}
              checked={filtrosLocais.preco === faixa.slug}
              onChange={() => handleFiltroClick("preco", faixa.slug)}
            />
            <label className="form-check-label" htmlFor={`checkPreco${index}`}>
              {faixa.label}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro Família Olfativa */}
      <div className="filtro-grupo border-top mb-2 py-2">
        <h5>Família Olfativa:</h5>
        {filtros.familias_olfativas?.map((familia, index) => (
          <div className="ps-4 d-flex align-items-center gap-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={familia}
              id={`checkFamilia${index}`}
              checked={filtrosLocais.familia_olfativa === familia}
              onChange={() => handleFiltroClick("familia_olfativa", familia)}
            />
            <label
              className="form-check-label"
              htmlFor={`checkFamilia${index}`}
            >
              {familia}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro Concentração */}
      <div className="filtro-grupo border-top mb-2 py-2">
        <h5>Concentração:</h5>
        {filtros.concentracoes?.map((concentracao, index) => (
          <div className="ps-4 d-flex align-items-center gap-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={concentracao}
              id={`checkConcentracao${index}`}
              checked={filtrosLocais.concentracao === concentracao}
              onChange={() => handleFiltroClick("concentracao", concentracao)}
            />
            <label
              className="form-check-label"
              htmlFor={`checkConcentracao${index}`}
            >
              {concentracao}
            </label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FiltrosProdutos;
