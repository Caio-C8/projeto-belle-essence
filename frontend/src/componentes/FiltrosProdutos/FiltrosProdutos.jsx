// src/componentes/FiltrosProdutos/FiltrosProdutos.jsx

import React, { useState, useEffect } from "react";

const FiltrosProdutos = ({
  filtros,
  filtrosAtivos,
  onFiltrosChange,
  configFiltros = null,
  valoresFiltrosPersonalizados = {},
}) => {
  const [filtrosLocais, setFiltrosLocais] = useState(filtrosAtivos);

  useEffect(() => {
    setFiltrosLocais(filtrosAtivos);
  }, [filtrosAtivos]);

  if (!filtros && !configFiltros) return null;

  const handleFiltroClick = (tipo, valor) => {
    const isAlreadySelected = filtrosLocais[tipo] === valor;
    const novosFiltros = {
      ...filtrosLocais,
      [tipo]: isAlreadySelected ? "" : valor,
    };
    setFiltrosLocais(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const getOpcoesFiltro = (tipo) => {
    if (valoresFiltrosPersonalizados[tipo]) {
      return valoresFiltrosPersonalizados[tipo];
    }
    if (!filtros) return [];

    switch (tipo) {
      case "marca":
        return filtros.marcas || [];
      case "familia_olfativa":
        return filtros.familias_olfativas || [];
      case "concentracao":
        return filtros.concentracoes || [];
      case "preco":
        return (
          filtros.faixas_preco?.map((faixa) => ({
            slug: faixa.slug,
            label: faixa.label,
          })) || []
        );
      default:
        return [];
    }
  };

  const renderGrupoFiltro = (tipo, label) => {
    const opcoes = getOpcoesFiltro(tipo);

    if (opcoes.length === 0) return null;

    return (
      <div className="filtro-grupo border-top py-2 mb-2">
        <h5>{label}:</h5>
        {opcoes.map((opcao, index) => {
          const valor = typeof opcao === "string" ? opcao : opcao.slug || opcao;
          const textoExibicao =
            typeof opcao === "string"
              ? opcao
              : opcao.label || opcao.slug || opcao;

          return (
            <div
              className="ps-4 d-flex align-items-center gap-2"
              key={`${tipo}-${index}`}
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={valor}
                id={`check-${tipo}-${index}`}
                checked={filtrosLocais[tipo] === valor}
                onChange={() => handleFiltroClick(tipo, valor)}
              />
              <label
                className="form-check-label"
                htmlFor={`check-${tipo}-${index}`}
              >
                {textoExibicao}
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <aside>
      <h3 className="mb-2 text-center">Filtros</h3>

      {/* Caso for uso com configFiltros (Estoque, Pedidos, etc) */}
      {configFiltros &&
        configFiltros.map(({ tipo, label }) => renderGrupoFiltro(tipo, label))}

      {/* Caso for uso com filtros dinâmicos do backend (Pesquisa pública) */}
      {!configFiltros && (
        <>
          {renderGrupoFiltro("marca", "Marcas")}
          {renderGrupoFiltro("preco", "Preços")}
          {renderGrupoFiltro("familia_olfativa", "Família Olfativa")}
          {renderGrupoFiltro("concentracao", "Concentração")}
        </>
      )}
    </aside>
  );
};

export default FiltrosProdutos;
