import React, { useState, useEffect } from "react";
import "./EnderecosPerfil.css";
import Modal from "../Modal/Modal";
import { useMask } from "@react-input/mask";
import { fetchApiPorId } from "../../../api/requisicoes";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { validarCamposAlterarEndereco } from "../../utilidades/validadores";

const EnderecosPerfil = ({ nome, sobrenome }) => {
  const { usuario } = useAutenticacao();
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Campos do formulário
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");

  const maskCep = useMask({
    mask: "_____-___",
    replacement: { _: /\d/ },
  });
  const maskNumero = useMask({
    mask: "__________",
    replacement: { _: /\d/ },
  });

  const estadosSiglas = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await fetchApiPorId("enderecos", usuario.id);
      setEnderecos(dados || []);
    };
    carregarDados();
  }, []);

  const abrirModalParaEdicao = (endereco) => {
    setModoEdicao(true);
    setEnderecoSelecionado(endereco);
    setLogradouro(endereco.logradouro);
    setNumero(endereco.numero);
    setBairro(endereco.bairro);
    setCep(endereco.cep);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);
    setTipo(endereco.tipo);
    setComplemento(endereco.complemento);
    setPontoReferencia(endereco.ponto_referencia);
    setMostrarModal(true);
  };

  const abrirModalParaCadastro = () => {
    setModoEdicao(false);
    setEnderecoSelecionado(null);
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCep("");
    setCidade("");
    setEstado("");
    setTipo("");
    setComplemento("");
    setPontoReferencia("");
    setMostrarModal(true);
  };

  const fecharModal = () => setMostrarModal(false);

  const salvar = async () => {
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

    if (erro) return alert(erro);

    const dados = {
      logradouro,
      numero,
      bairro,
      cep,
      cidade,
      estado,
      tipo,
      complemento,
      pontoReferencia,
      idCliente: usuario.id,
    };

    const url = modoEdicao
      ? `http://localhost:3000/atualizar-endereco/${enderecoSelecionado.id_endereco}`
      : "http://localhost:3000/cadastrar-endereco";

    const metodo = modoEdicao ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const { mensagem, endereco } = await res.json();

      if (res.ok) {
        alert(mensagem || "Endereço salvo com sucesso!");

        if (modoEdicao) {
          const dadosParaAtualizar = {
            logradouro,
            numero,
            bairro,
            cep,
            cidade,
            estado,
            tipo,
            complemento,
            ponto_referencia: pontoReferencia, // mapeando corretamente
          };

          setEnderecos((enderecosAtuais) =>
            enderecosAtuais.map((enderecoAtual) =>
              enderecoAtual.id_endereco === enderecoSelecionado.id_endereco
                ? { ...enderecoAtual, ...dadosParaAtualizar }
                : enderecoAtual
            )
          );
        } else {
          setEnderecos((enderecosAtuais) => [...enderecosAtuais, endereco]);
        }

        fecharModal();
      } else {
        alert(`Erro: ${mensagem}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  const excluirEndereco = async (idEndereco) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmar) return;

    try {
      const res = await fetch(
        `http://localhost:3000/deletar-endereco/${idEndereco}`,
        {
          method: "DELETE",
        }
      );

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
        setEnderecos((enderecosAtuais) =>
          enderecosAtuais.filter(
            (enderecoAtual) => enderecoAtual.id_endereco !== idEndereco
          )
        );
      } else {
        alert(`Erro ao excluir: ${mensagem}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="enderecos">
      {enderecos.length > 0 ? (
        enderecos.map((endereco, index) => (
          <div key={index} className="endereco">
            <div>{`${endereco.logradouro}, ${endereco.numero}`}</div>
            <div>{`${endereco.bairro} - CEP ${endereco.cep} - ${endereco.cidade} - ${endereco.estado}`}</div>
            <div>{`${endereco.tipo} - ${nome} ${sobrenome}`}</div>
            <div>{endereco.complemento}</div>
            <div>{endereco.ponto_referencia}</div>
            <button onClick={() => abrirModalParaEdicao(endereco)}>
              Alterar
            </button>
            <button onClick={() => excluirEndereco(endereco.id_endereco)}>
              Excluir
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum endereço cadastrado.</p>
      )}

      <button onClick={abrirModalParaCadastro}>Cadastrar novo endereço</button>

      <Modal
        titulo={modoEdicao ? "Alterar Endereço" : "Cadastrar Endereço"}
        aberto={mostrarModal}
        fechar={fecharModal}
        salvar={salvar}
        campos={[
          {
            label: "Logradouro",
            placeholder: "Rua, avenida, etc.",
            name: "logradouro",
            value: logradouro,
            onChange: (e) => setLogradouro(e.target.value),
          },
          {
            label: "Número",
            placeholder: "Número",
            name: "numero",
            value: numero,
            onChange: (e) => setNumero(e.target.value),
            mask: maskNumero,
          },
          {
            label: "Bairro",
            placeholder: "Seu bairro",
            name: "bairro",
            value: bairro,
            onChange: (e) => setBairro(e.target.value),
          },
          {
            label: "CEP",
            placeholder: "00000-000",
            name: "cep",
            value: cep,
            onChange: (e) => setCep(e.target.value),
            mask: maskCep,
          },
          {
            label: "Cidade",
            placeholder: "Sua cidade",
            name: "cidade",
            value: cidade,
            onChange: (e) => setCidade(e.target.value),
          },
          {
            label: "Estado",
            name: "estado",
            value: estado,
            onChange: (e) => setEstado(e.target.value),
            type: "select",
            options: estadosSiglas,
          },
          {
            label: "Tipo",
            name: "tipo",
            value: tipo,
            onChange: (e) => setTipo(e.target.value),
            type: "select",
            options: ["Residencial", "Comercial"],
          },
          {
            label: "Complemento",
            placeholder: "Apto, bloco, etc.",
            name: "complemento",
            value: complemento,
            onChange: (e) => setComplemento(e.target.value),
          },
          {
            label: "Ponto de Referência",
            placeholder: "Próximo à...",
            name: "ponto de referencia",
            value: pontoReferencia,
            onChange: (e) => setPontoReferencia(e.target.value),
          },
        ]}
      />
    </div>
  );
};

export default EnderecosPerfil;
