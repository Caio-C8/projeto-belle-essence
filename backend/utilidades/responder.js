const responder = (
  res,
  { status = 200, sucesso = true, mensagem = "", dados = null }
) => {
  const corpo = {
    sucesso,
    mensagem,
  };

  if (dados !== null) {
    corpo.dados = dados;
  }

  return res.status(status).json(corpo);
};

module.exports = responder;
