const montarFiltrosQuery = (filtros) => {
  const conditions = [];
  const params = [];

  if (filtros.marca) {
    params.push(filtros.marca);
    conditions.push(`LOWER(marca) = LOWER($${params.length})`);
  }

  if (filtros.familia_olfativa) {
    params.push(filtros.familia_olfativa);
    conditions.push(`LOWER(familia_olfativa) = LOWER($${params.length})`);
  }

  if (filtros.concentracao) {
    params.push(filtros.concentracao);
    conditions.push(`LOWER(concentracao) = LOWER($${params.length})`);
  }

  if (filtros.preco) {
    const faixa = getFaixaPreco(filtros.preco);
    if (faixa) {
      if (faixa.min !== null) {
        params.push(faixa.min);
        conditions.push(`preco >= $${params.length}`);
      }
      if (faixa.max !== null) {
        params.push(faixa.max);
        conditions.push(`preco <= $${params.length}`);
      }
    }
  }

  return { conditions, params };
};

const getFaixaPreco = (slug) => {
  const faixas = {
    "ate-50": { min: 0, max: 50 },
    "50-100": { min: 50, max: 100 },
    "100-150": { min: 100, max: 150 },
    "150-200": { min: 150, max: 200 },
    "200-250": { min: 200, max: 250 },
    "acima-250": { min: 250, max: null },
  };
  return faixas[slug] || null;
};

const aplicarFiltros = (baseQuery, filtros, startParamIndex = 1) => {
  const { conditions, params } = montarFiltrosQuery(filtros);
  let query = baseQuery;

  if (conditions.length > 0) {
    const adjustedConditions = conditions.map((condition) => {
      return condition.replace(/\$(\d+)/g, (match, num) => {
        return `$${parseInt(num) + startParamIndex - 1}`;
      });
    });

    if (query.includes("WHERE")) {
      query += " AND " + adjustedConditions.join(" AND ");
    } else {
      query += " WHERE " + adjustedConditions.join(" AND ");
    }
  }

  return { query, params };
};

module.exports = {
  montarFiltrosQuery,
  aplicarFiltros,
};
