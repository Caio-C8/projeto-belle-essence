const pool = require("../connect");

const buscarClientePorEmailOuCelularOuCpf = async (email, celular, cpf) => {
  const query = `
    SELECT email, celular, cpf
    FROM clientes
    WHERE email = $1 OR celular = $2 OR cpf = $3
  `;
  const resultado = await pool.query(query, [email, celular, cpf]);
  return resultado.rows[0];
};

const verificarDuplicadosCliente = async (email, celular, id) => {
  const query = `
    SELECT email, celular
    FROM clientes
    WHERE (email = $1 OR celular = $2) AND id_cliente != $3
  `;
  const result = await pool.query(query, [email, celular, id]);
  return result.rows[0];
};

const buscarClienteCompletoPorId = async (id) => {
  const query = `
    SELECT email, senha, nome, sobrenome, celular, data_nascimento
    FROM clientes
    WHERE id_cliente = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  buscarClientePorEmailOuCelularOuCpf,
  verificarDuplicadosCliente,
  buscarClienteCompletoPorId,
};
