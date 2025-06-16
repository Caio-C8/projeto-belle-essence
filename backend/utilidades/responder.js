function responder(
  res,
  { status = 200, sucesso = true, mensagem = "", dados = null, filtros = null }
) {
  const corpo = {
    sucesso,
    mensagem,
  };

  if (dados !== null) {
    corpo.dados = dados;
  }

  if (filtros !== null) {
    corpo.filtros = filtros;
  }

  return res.status(status).json(corpo);
}

module.exports = responder;


