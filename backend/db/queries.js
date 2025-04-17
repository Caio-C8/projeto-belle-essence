const pool = require("../connect");

const buscarTodos = async (tabela, ordem) => {
  const query = `SELECT * FROM ${tabela} ORDER BY ${ordem} ASC`;
  const resultado = await pool.query(query);
  return resultado.rows;
};

const buscarPorId = async (tabela, colunaId, id) => {
  const query = `SELECT * FROM ${tabela} WHERE ${colunaId} = $1`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

module.exports = {
  buscarTodos,
  buscarPorId,
};
