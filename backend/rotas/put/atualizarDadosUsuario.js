const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  verificarDuplicadosCliente,
  buscarClienteCompletoPorId,
} = require("../../db/queriesClientes");
const {
  atualizarColunaPorId,
  atualizarColunasPorId,
} = require("../../db/queries");
const {
  validarCamposAlterarDadosUsuario,
} = require("../../utilidades/validadores");
const responder = require("../../utilidades/responder");

router.put("/:id", async (req, res) => {
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

    if (email !== null) {
      await atualizarColunaPorId("clientes", "email", "id_cliente", [
        email,
        idCliente,
      ]);
      return responder(res, {
        mensagem: "E-mail alterado.",
      });
    }

    if (senha !== null && confirmarSenha !== null) {
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

    if (nome !== null && sobrenome !== null) {
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

    if (celular !== null) {
      await atualizarColunaPorId("clientes", "celular", "id_cliente", [
        celular,
        idCliente,
      ]);
      return responder(res, {
        mensagem: "Celular alterado.",
      });
    }

    if (dataNascimento !== null) {
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
});

module.exports = router;
