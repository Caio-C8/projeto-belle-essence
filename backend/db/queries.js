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

const deletarItemPorId = async (tabela, colunaId, id) => {
  await pool.query(`DELETE FROM ${tabela} WHERE ${colunaId} = $1`, [id]);
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
  deletarItemPorId,
  inserirRegistro,
  atualizarColunasPorId,
};
