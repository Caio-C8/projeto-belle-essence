const pool = require("../connect");

const buscarTodos = async (tabela, ordem) => {
  const resultado = await pool.query(
    `SELECT * FROM ${tabela} ORDER BY ${ordem} ASC`
  );
  return resultado.rows;
};

const buscarTodosPorId = async (tabela, colunaId, id) => {
  const resultado = await pool.query(
    `SELECT * FROM ${tabela} WHERE ${colunaId} = $1`,
    [id]
  );
  return resultado.rows;
};

const buscarPorId = async (tabela, colunaId, id) => {
  const resultado = await pool.query(
    `SELECT * FROM ${tabela} WHERE ${colunaId} = $1`,
    [id]
  );
  return resultado.rows[0];
};

const atualizarDadosPorId = async (tabela, coluna, colunaId, dados) => {
  await pool.query(
    `UPDATE ${tabela} SET ${coluna} = $1 WHERE ${colunaId} = $2`,
    dados
  );
};

const deletarItemPorId = async (tabela, colunaId, id) => {
  await pool.query(`DELETE FROM ${tabela} WHERE ${colunaId} = $1`, [id]);
};

module.exports = {
  buscarTodos,
  buscarTodosPorId,
  buscarPorId,
  atualizarDadosPorId,
  deletarItemPorId,
};
