function validarCpf(cpf) {
  // Remove todos os caracteres que não sejam dígitos numéricos.
  const strCPF = String(cpf).replace(/[^\d]/g, "");

  // Verifica se o CPF possui exatamente 11 dígitos.
  if (strCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais, o que torna o CPF inválido.
  if (/^(\d)\1{10}$/.test(strCPF)) return false;

  // Calcula o primeiro dígito verificador.
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(strCPF.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(strCPF.charAt(9))) return false;

  // Calcula o segundo dígito verificador.
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(strCPF.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(strCPF.charAt(10))) return false;

  // Se todas as verificações passaram, o CPF é válido.
  return true;
}

function validarNumeroCelular(telefone) {
  // Remove todos os caracteres que não sejam dígitos numéricos.
  telefone = telefone.replace(/\D/g, "");

  // Verifica se o número possui exatamente 11 dígitos.
  if (telefone.length !== 11) return false;

  // Verifica se o terceiro dígito é '9', indicando um número de celular.
  if (telefone[2] !== "9") return false;

  // Verifica se todos os dígitos são iguais, o que torna o número inválido.
  if (/^(\d)\1{10}$/.test(telefone)) return false;

  // Verifica se os últimos 8 dígitos não são todos iguais.
  const parteNumero = telefone.substring(3);
  if (/^(\d)\1{7,}$/.test(parteNumero)) return false;

  // Lista de DDDs válidos conforme a Anatel.
  const dddsValidos = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];

  // Extrai o DDD e verifica se é válido.
  const ddd = parseInt(telefone.substring(0, 2), 10);
  if (!dddsValidos.includes(ddd)) return false;

  // Se todas as verificações passaram, o número de celular é válido.
  return true;
}

function validarEmail(email) {
  if (!email.includes("@")) return false;

  return true;
}

function validarSenha(senha) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regex.test(senha)) return false;

  return true;
}

function validarNomeSobrenome(nome, sobrenome) {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!regex.test(nome) || !regex.test(sobrenome)) return false;

  return true;
}

function validarDataNascimento(dataStr) {
  const data = new Date(dataStr);
  const hoje = new Date();

  const cemAnosAtras = new Date();
  cemAnosAtras.setFullYear(hoje.getFullYear() - 100);

  if (!(data <= hoje) || !(data >= cemAnosAtras)) return false;

  return true;
}

function validarCep(cep) {
  const cepFormatado = cep.replace("-", "");

  if (cepFormatado.length !== 8) return false;
  if (isNaN(cepFormatado)) return false;

  return true;
}

function validarNumeroEndereco(numero) {
  if (isNaN(numero)) return false;

  return true;
}

function validarCamposCadastro({
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
  complemento,
  pontoReferencia,
  tipo,
}) {
  if (
    !email ||
    !senha ||
    !nome ||
    !sobrenome ||
    !celular ||
    !dataNascimento ||
    !cpf ||
    !cep ||
    !logradouro ||
    !numero ||
    !bairro ||
    !cidade ||
    !estado ||
    !complemento ||
    !pontoReferencia ||
    !tipo
  ) {
    return "Todos os campos devem ser preenchidos.";
  }
  if (!validarEmail(email)) {
    return "E-mail inválido.";
  }
  if (!validarSenha(senha)) {
    return "Senha deve conter no mínimo 8 caracteres, 1 letra, 1 símbolo e 1 número.";
  }
  if (!validarNomeSobrenome(nome, sobrenome)) {
    return "Nome ou Sobrenome inválidos.";
  }
  if (!validarNumeroCelular(celular)) {
    return "Número de celular inválido.";
  }
  if (!validarDataNascimento(dataNascimento)) {
    return "Data de nascimento inválida.";
  }
  if (!validarCpf(cpf)) {
    return "CPF inválido.";
  }
  if (!validarCep(cep)) {
    return "CEP inválido.";
  }
  if (!validarNumeroEndereco(numero)) {
    return "Número de endereço inválido.";
  }

  return null;
}

function validarCamposAlterarDadosUsuario(
  email,
  senha,
  confirmarSenha,
  nome,
  sobrenome,
  celular,
  dataNascimento
) {
  if (email !== null) {
    if (!validarEmail(email)) {
      return "E-mail inválido.";
    }
  }
  if (senha !== null && confirmarSenha !== null) {
    if (!validarSenha(senha)) {
      return "Senha deve conter no mínimo 8 caracteres, 1 letra, 1 símbolo e 1 número.";
    }
    if (senha !== confirmarSenha) {
      return "As senhas digitadas são diferentes.";
    }
  }
  if (nome !== null && sobrenome !== null) {
    if (!validarNomeSobrenome(nome, sobrenome)) {
      return "Nome ou Sobrenome inválidos.";
    }
  }
  if (celular !== null) {
    if (!validarNumeroCelular(celular)) {
      return "Número de celular inválido.";
    }
  }
  if (dataNascimento !== null) {
    if (!validarDataNascimento(dataNascimento)) {
      return "Data de nascimento inválida.";
    }
  }

  return null;
}

module.exports = {
  validarCamposCadastro,
  validarCamposAlterarDadosUsuario,
};
