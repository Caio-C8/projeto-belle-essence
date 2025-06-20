const bcrypt = require("bcrypt");
const responder = require("../utilidades/responder");
const {
  buscarPorColuna,
  buscarTodosPorColuna,
  inserirRegistro,
} = require("../db/queries");
const {
  validarCamposCadastro,
  validarCamposAlterarEndereco,
} = require("../utilidades/validadores");
const {
  buscarClientePorEmailOuCelularOuCpf,
} = require("../db/queriesClientes");
const pool = require("../connect");

const cadastrarEnderecoCliente = async (req, res) => {
  const {
    idCliente,
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

  if (!idCliente) {
    return responder(res, {
      status: 404,
      sucesso: false,
      mensagem: "Cliente não identificado.",
    });
  }

  const erro = validarCamposAlterarEndereco(
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo
  );

  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  try {
    const enderecoCadastrado = await inserirRegistro("enderecos", {
      id_cliente: idCliente,
      logradouro,
      numero,
      complemento,
      ponto_referencia: pontoReferencia,
      bairro,
      cep,
      cidade,
      estado,
      tipo,
    });

    return responder(res, {
      status: 201,
      mensagem: "Endereço cadastrado com sucesso!",
      dados: enderecoCadastrado,
    });
  } catch (error) {
    console.error("Erro ao cadastrar endereço:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const cadastrarNovoUsuario = async (req, res) => {
  const { usuario, endereco } = req.body;
  const {
    email,
    senha,
    confirmarSenha,
    nome,
    sobrenome,
    celular,
    dataNascimento,
    cpf,
  } = usuario;

  const {
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    complemento,
    pontoReferencia,
    tipo,
  } = endereco;

  const erro = validarCamposCadastro({
    email,
    senha,
    nome,
    sobrenome,
    celular,
    dataNascimento,
    cpf,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    tipo,
  });

  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  if (senha !== confirmarSenha)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "As senhas digitadas são diferentes.",
    });

  try {
    const duplicado = await buscarClientePorEmailOuCelularOuCpf(
      email,
      celular,
      cpf
    );
    if (duplicado) {
      if (duplicado.email === email)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "E-mail já cadastrado.",
        });
      if (duplicado.celular === celular)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "Celular já cadastrado.",
        });
      if (duplicado.cpf === cpf)
        return responder(res, {
          status: 409,
          sucesso: false,
          mensagem: "CPF já cadastrado.",
        });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const cliente = await inserirRegistro("clientes", {
      email,
      senha: senhaCriptografada,
      nome,
      sobrenome,
      celular,
      data_nascimento: dataNascimento,
      cpf,
    });

    await inserirRegistro("enderecos", {
      id_cliente: cliente.id_cliente,
      cep,
      logradouro,
      numero,
      complemento,
      ponto_referencia: pontoReferencia,
      bairro,
      cidade,
      estado,
      tipo,
    });

    await inserirRegistro("carrinhos", { id_cliente: cliente.id_cliente });
    await inserirRegistro("listas_favoritos", {
      id_cliente: cliente.id_cliente,
    });

    return responder(res, {
      status: 201,
      mensagem: "Usuário cadastrado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const adicionarProdutoAoCarrinho = async (req, res) => {
  const { idProduto, idUsuario } = req.body;

  try {
    const carrinho = await buscarPorColuna(
      "carrinhos",
      "id_cliente",
      idUsuario
    );
    const itensCarrinho = await buscarTodosPorColuna(
      "itens_carrinho",
      "id_carrinho",
      carrinho.id_carrinho
    );

    const produtoJaExiste = itensCarrinho.find(
      (item) => item.id_produto === idProduto
    );
    if (produtoJaExiste) {
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Produto já está no carrinho.",
      });
    }

    await inserirRegistro("itens_carrinho", {
      id_carrinho: carrinho.id_carrinho,
      id_produto: idProduto,
      qtde: 1,
    });

    return responder(res, { mensagem: "Produto adicionado na sacola." });
  } catch (error) {
    console.error("Erro ao adicionar produto no carrinho:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const adicionarProdutoAosFavoritos = async (req, res) => {
  const { idProduto, idUsuario } = req.body;

  try {
    const listaFavoritos = await buscarPorColuna(
      "listas_favoritos",
      "id_cliente",
      idUsuario
    );

    await inserirRegistro("itens_lista_favoritos", {
      id_lista_favoritos: listaFavoritos.id_lista_favoritos,
      id_produto: idProduto,
      data_adicionado: new Date(),
    });

    return responder(res, {
      mensagem: "Produto adicionado na lista de favoritos.",
    });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

const realizarPedidoCliente = async (req, res) => {
  const { idUsuario, idEndereco, idCarrinho, produtosPedido } = req.body;

  if (!idEndereco) {
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Selecione um endereço para entrega.",
    });
  }

  try {
    const pedido = await inserirRegistro("pedidos", {
      id_cliente: idUsuario,
      id_endereco: idEndereco,
      id_carrinho: idCarrinho,
      data_pedido: new Date(),
      status: "Aguardando Pagamento.",
    });

    for (const item of produtosPedido) {
      const { idProduto, qtde, precoUnitario } = item;

      await inserirRegistro("itens_pedido", {
        id_pedido: pedido.id_pedido,
        id_produto: idProduto,
        qtde,
        preco_unitario: precoUnitario,
      });

      await pool.query(
        `
        UPDATE produtos
        SET qtde_estoque = qtde_estoque - $1,
            numero_vendas = numero_vendas + $1
        WHERE id_produto = $2
        `,
        [qtde, idProduto]
      );
    }

    return responder(res, {
      mensagem: "Pedido registrado com sucesso!",
      dados: { idPedido: pedido.id_pedido },
    });
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
};

module.exports = {
  cadastrarEnderecoCliente,
  cadastrarNovoUsuario,
  adicionarProdutoAoCarrinho,
  adicionarProdutoAosFavoritos,
  realizarPedidoCliente,
};
