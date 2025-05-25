const pool = require("../connect");

const buscarTodos = async (tabela, ordem) => {
  const resultado = await pool.query(
    `SELECT * FROM ${tabela} ORDER BY ${ordem} ASC`
  );
  return resultado.rows;
};

const buscarTodosPorColuna = async (tabela, coluna, valor) => {
  const resultado = await pool.query(
    `SELECT * FROM ${tabela} WHERE ${coluna} = $1`,
    [valor]
  );
  return resultado.rows;
};

const buscarPorColuna = async (tabela, coluna, valor) => {
  const resultado = await pool.query(
    `SELECT * FROM ${tabela} WHERE ${coluna} = $1`,
    [valor]
  );
  return resultado.rows[0];
};

const atualizarColunaPorId = async (
  tabela,
  campo,
  colunaId,
  [valorCampo, valorId]
) => {
  await pool.query(
    `UPDATE ${tabela} SET ${campo} = $1 WHERE ${colunaId} = $2`,
    [valorCampo, valorId]
  );
};

const atualizarColunasPorId = async (tabela, campos, colunaId, valorId) => {
  const colunas = Object.keys(campos);
  const valores = Object.values(campos);
  const sets = colunas.map((col, i) => `${col} = $${i + 1}`).join(", ");
  valores.push(valorId);

  const query = `UPDATE ${tabela} SET ${sets} WHERE ${colunaId} = $${valores.length}`;
  await pool.query(query, valores);
};

const atualizarColunasPorCondicoes = async (tabela, condicoes, novosDados) => {
  const colunasCondicao = Object.keys(condicoes);
  const valoresCondicao = Object.values(condicoes);
  const colunasUpdate = Object.keys(novosDados);
  const valoresUpdate = Object.values(novosDados);

  const setString = colunasUpdate
    .map((coluna, index) => `${coluna} = $${index + 1}`)
    .join(", ");

  const whereString = colunasCondicao
    .map((coluna, index) => `${coluna} = $${colunasUpdate.length + index + 1}`)
    .join(" AND ");

  const query = `
    UPDATE ${tabela}
    SET ${setString}
    WHERE ${whereString}
  `;

  const valores = [...valoresUpdate, ...valoresCondicao];

  await pool.query(query, valores);
};

const deletarItemPorColuna = async (tabela, colunaId, id) => {
  await pool.query(`DELETE FROM ${tabela} WHERE ${colunaId} = $1`, [id]);
};

const deletarItensPorColuna = async (tabela, condicoes) => {
  const colunas = Object.keys(condicoes);
  const valores = Object.values(condicoes);

  const where = colunas
    .map((coluna, index) => `${coluna} = $${index + 1}`)
    .join(" AND ");

  const query = `DELETE FROM ${tabela} WHERE ${where}`;

  await pool.query(query, valores);
};

const inserirRegistro = async (tabela, dados) => {
  const colunas = Object.keys(dados);
  const valores = Object.values(dados);
  const placeholders = colunas.map((_, i) => `$${i + 1}`).join(", ");

  const query = `
    INSERT INTO ${tabela} (${colunas.join(", ")})
    VALUES (${placeholders})
    RETURNING *
  `;

  const resultado = await pool.query(query, valores);
  return resultado.rows[0];
};

module.exports = {
  buscarTodos,
  buscarTodosPorColuna,
  buscarPorColuna,
  atualizarColunaPorId,
  deletarItemPorColuna,
  inserirRegistro,
  atualizarColunasPorId,
  deletarItensPorColuna,
  atualizarColunasPorCondicoes,
};
