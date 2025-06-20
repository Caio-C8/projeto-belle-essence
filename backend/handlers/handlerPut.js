const {
  buscarPorColuna,
  atualizarColunasPorCondicoes,
  atualizarColunaPorId,
  atualizarColunasPorId,
} = require("../db/queries");
const {
  validarSenha,
  validarEmail,
  validarCamposAlterarEndereco,
  validarCamposAlterarDadosUsuario,
} = require("../utilidades/validadores");
const {
  verificarDuplicadosCliente,
  buscarClienteCompletoPorId,
} = require("../db/queriesClientes");
const bcrypt = require("bcrypt");
const responder = require("../utilidades/responder");
const pool = require("../connect");

const atualizarQuantidadeCarrinho = async (req, res) => {
  const { idUsuario, idProduto, novaQuantidade } = req.body;

  try {
    if (novaQuantidade < 1)
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem: "Quantidade inválida.",
      });

    const carrinhoCliente = await buscarPorColuna(
      "carrinhos",
      "id_cliente",
      idUsuario
    );

    if (!carrinhoCliente) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Carrinho não encontrado.",
      });
    }

    await atualizarColunasPorCondicoes(
      "itens_carrinho",
      {
        id_carrinho: carrinhoCliente.id_carrinho,
        id_produto: idProduto,
      },
      { qtde: novaQuantidade }
    );

    return responder(res, {
      mensagem: "Quantidade atualizada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao atualizar a quantidade.",
    });
  }
};

const alterarSenha = async (req, res) => {
  const { email, senha, confirmarSenha } = req.body;

  if (!email || !senha || !confirmarSenha)
    return responder(res, {
      status: 409,
      sucesso: false,
      mensagem: "Preencha todos os campos.",
    });

  const erroEmail = validarEmail(email);
  if (!erroEmail)
    return responder(res, {
      status: 401,
      sucesso: false,
      mensagem: "E-mail inválido.",
    });

  const erroSenha = validarSenha(senha);
  if (!erroSenha)
    return responder(res, {
      status: 401,
      sucesso: false,
      mensagem:
        "Senha deve conter no mínimo 8 caracteres, 1 letra, 1 símbolo e 1 número.",
    });

  if (senha !== confirmarSenha)
    return responder(res, {
      status: 401,
      sucesso: false,
      mensagem: "As senhas digitadas são diferentes.",
    });

  try {
    const clienteCadastrado = await buscarPorColuna("clientes", "email", email);

    if (email !== clienteCadastrado.email)
      return responder(res, {
        status: 401,
        sucesso: false,
        mensagem: "E-mail está incorreto",
      });

    const senhaConfere = await bcrypt.compare(senha, clienteCadastrado.senha);
    if (senhaConfere)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Senha não pode ser igual a cadastrada.",
      });

    const novaSenha = await bcrypt.hash(senha, 10);
    await atualizarColunaPorId("clientes", "senha", "email", [
      novaSenha,
      email,
    ]);

    return responder(res, {
      mensagem: "Senha alterada.",
    });
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const atualizarDadosEndereco = async (req, res) => {
  const idEndereco = req.params.id;
  const {
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo,
    complemento,
    pontoReferencia,
  } = req.body;

  const erro = validarCamposAlterarEndereco(
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo,
    complemento,
    pontoReferencia
  );

  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  try {
    const enderecoCadastrado = await buscarPorColuna(
      "enderecos",
      "id_endereco",
      idEndereco
    );

    const logradouroCadastrado = enderecoCadastrado.logradouro;
    const numeroCadastrado = enderecoCadastrado.numero;
    const bairroCadastrado = enderecoCadastrado.bairro;
    const cepCadastrado = enderecoCadastrado.cep;
    const cidadeCadastrada = enderecoCadastrado.cidade;
    const estadoCadastrado = enderecoCadastrado.estado;
    const tipoCadastrado = enderecoCadastrado.tipo;
    const complementoCadastrado = enderecoCadastrado.complemento;
    const pontoReferenciaCadastrado = enderecoCadastrado.ponto_referencia;

    if (
      logradouro === logradouroCadastrado &&
      numero === numeroCadastrado &&
      bairro === bairroCadastrado &&
      cep === cepCadastrado &&
      cidade === cidadeCadastrada &&
      estado === estadoCadastrado &&
      tipo === tipoCadastrado &&
      complemento === complementoCadastrado &&
      pontoReferencia === pontoReferenciaCadastrado
    )
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem: "Altere algum dos campos para salvar.",
      });

    if (logradouro !== logradouroCadastrado) {
      await atualizarColunaPorId("enderecos", "logradouro", "id_endereco", [
        logradouro,
        idEndereco,
      ]);
    }

    if (numero !== numeroCadastrado) {
      await atualizarColunaPorId("enderecos", "numero", "id_endereco", [
        numero,
        idEndereco,
      ]);
    }

    if (complemento !== complementoCadastrado) {
      await atualizarColunaPorId("enderecos", "complemento", "id_endereco", [
        complemento,
        idEndereco,
      ]);
    }

    if (pontoReferencia !== pontoReferenciaCadastrado) {
      await atualizarColunaPorId(
        "enderecos",
        "ponto_referencia",
        "id_endereco",
        [pontoReferencia, idEndereco]
      );
    }

    if (bairro !== bairroCadastrado) {
      await atualizarColunaPorId("enderecos", "bairro", "id_endereco", [
        bairro,
        idEndereco,
      ]);
    }

    if (cep !== cepCadastrado) {
      await atualizarColunaPorId("enderecos", "cep", "id_endereco", [
        cep,
        idEndereco,
      ]);
    }

    if (cidade !== cidadeCadastrada) {
      await atualizarColunaPorId("enderecos", "cidade", "id_endereco", [
        cidade,
        idEndereco,
      ]);
    }

    if (estado !== estadoCadastrado) {
      await atualizarColunaPorId("enderecos", "estado", "id_endereco", [
        estado,
        idEndereco,
      ]);
    }

    if (tipo !== tipoCadastrado) {
      await atualizarColunaPorId("enderecos", "tipo", "id_endereco", [
        tipo,
        idEndereco,
      ]);
    }

    return responder(res, {
      mensagem: "Endereço atualizado com sucesso!",
      dados: {
        logradouro,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        tipo,
        complemento,
        pontoReferencia,
      },
    });
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const atualizarDadosCliente = async (req, res) => {
  const idCliente = req.params.id;
  const {
    email,
    senha,
    confirmarSenha,
    nome,
    sobrenome,
    celular,
    dataNascimento,
  } = req.body;

  const erro = validarCamposAlterarDadosUsuario(
    email,
    senha,
    confirmarSenha,
    nome,
    sobrenome,
    celular,
    dataNascimento
  );
  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  try {
    if (!email && !senha && !nome && !sobrenome && !celular && !dataNascimento)
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem: "Preencha todos os campos.",
      });

    const duplicado = await verificarDuplicadosCliente(
      email,
      celular,
      idCliente
    );
    if (duplicado) {
      if (duplicado.email === email)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "E-mail informado já é cadastrado",
        });

      if (duplicado.celular === celular)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "Número de celular informado já é cadastrado",
        });
    }

    const usuario = await buscarClienteCompletoPorId(idCliente);
    if (usuario.email === email)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "E-mail não pode ser igual ao cadastrado.",
      });

    if (usuario.nome === nome || usuario.sobrenome === sobrenome)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Nome ou sobrenome não podem ser iguais aos cadastrados.",
      });

    if (usuario.celular === celular)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Celular não pode ser igual ao cadastrado.",
      });

    if (usuario.data_nascimento === dataNascimento)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Data de nascimento não pode ser igual à cadastrada.",
      });

    if (email) {
      await atualizarColunaPorId("clientes", "email", "id_cliente", [
        email,
        idCliente,
      ]);
      return responder(res, {
        mensagem: "E-mail alterado.",
      });
    }

    if (senha && confirmarSenha) {
      const senhaConfere = await bcrypt.compare(senha, usuario.senha);
      if (senhaConfere)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "Senha não pode ser igual à cadastrada.",
        });

      if (senha !== confirmarSenha)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "As senhas digitadas são diferentes.",
        });

      const senhaCriptografada = await bcrypt.hash(senha, 10);
      await atualizarColunaPorId("clientes", "senha", "id_cliente", [
        senhaCriptografada,
        idCliente,
      ]);
      return responder(res, {
        mensagem: "Senha alterada.",
      });
    }

    if (nome && sobrenome) {
      await atualizarColunasPorId(
        "clientes",
        { nome, sobrenome },
        "id_cliente",
        idCliente
      );
      return responder(res, {
        mensagem: "Nome e sobrenome alterados.",
      });
    }

    if (celular) {
      await atualizarColunaPorId("clientes", "celular", "id_cliente", [
        celular,
        idCliente,
      ]);
      return responder(res, {
        mensagem: "Celular alterado.",
      });
    }

    if (dataNascimento) {
      await atualizarColunaPorId("clientes", "data_nascimento", "id_cliente", [
        dataNascimento,
        idCliente,
      ]);

      return responder(res, {
        mensagem: "Data de nascimento alterada.",
      });
    }
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const cancelarPedido = async (req, res) => {
  const { idPedido } = req.body;

  try {
    const pedido = await buscarPorColuna("pedidos", "id_pedido", idPedido);

    if (!pedido) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Pedido não encontrado.",
      });
    }

    if (pedido.status === "Cancelado") {
      return responder(res, {
        mensagem: "Pedido já está cancelado.",
      });
    }

    const itensQuery = await pool.query(
      "SELECT id_produto, qtde FROM itens_pedido WHERE id_pedido = $1",
      [idPedido]
    );

    for (const item of itensQuery.rows) {
      await pool.query(
        `
        UPDATE produtos
        SET qtde_estoque = qtde_estoque + $1,
            numero_vendas = numero_vendas - $1
        WHERE id_produto = $2
        `,
        [item.qtde, item.id_produto]
      );
    }

    await atualizarColunaPorId("pedidos", "status", "id_pedido", [
      "Cancelado",
      idPedido,
    ]);

    return responder(res, {
      mensagem: "Pedido cancelado e estoque/vendas revertidos.",
    });
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao cancelar o pedido.",
    });
  }
};

module.exports = {
  atualizarQuantidadeCarrinho,
  alterarSenha,
  atualizarDadosEndereco,
  atualizarDadosCliente,
  cancelarPedido,
};
