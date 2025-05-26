import React, { useState, useEffect } from "react";
import "../Perfil.css";
import Modal from "../../../componentes/Modal/Modal";
import { useMask } from "@react-input/mask";
import { fetchApiPorId } from "../../../../api/requisicoes";
import { useAutenticacao } from "../../../contexto/AutenticarContexto";
import { validarCamposAlterarEndereco } from "../../../utilidades/validadores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

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

    const dadosBody = {
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
        body: JSON.stringify(dadosBody),
      });

      const { mensagem, dados } = await res.json();

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
          setEnderecos((enderecosAtuais) => [...enderecosAtuais, dados]);
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
    <div>
      <h1 className="fw-bold mb-2">Endereços</h1>

      <div>
        {enderecos.length > 0 ? (
          enderecos.map((endereco, index) => (
            <div
              key={index}
              className="d-flex justify-content-between border rounded p-3 mb-3"
            >
              <div>
                <h3>{`${endereco.logradouro}, ${endereco.numero}`}</h3>
                <p>{`${endereco.bairro} - CEP ${endereco.cep} - ${endereco.cidade} - ${endereco.estado}`}</p>
                <p>{`${endereco.tipo} - ${nome} ${sobrenome}`}</p>
                <p>
                  {endereco.complemento && endereco.ponto_referencia
                    ? `${endereco.complemento} - ${endereco.ponto_referencia}`
                    : endereco.complemento && !endereco.ponto_referencia
                    ? `${endereco.complemento}`
                    : `${endereco.ponto_referencia}`}
                </p>
              </div>

              <div className="d-flex flex-column gap-4">
                <button onClick={() => abrirModalParaEdicao(endereco)}>
                  <FontAwesomeIcon
                    icon={faPenClip}
                    className="icon"
                    style={{ color: "#FFB4A2", fontSize: "1.5rem" }}
                  />
                </button>
                <button onClick={() => excluirEndereco(endereco.id_endereco)}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="icon"
                    style={{ color: "#cccccc", fontSize: "1.5rem" }}
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum endereço cadastrado.</p>
        )}

        <div className="w-100 d-flex align-items-center justify-content-center">
          <button className="btn btn-primary " onClick={abrirModalParaCadastro}>
            Cadastrar novo endereço
          </button>
        </div>

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
    </div>
  );
};

export default EnderecosPerfil;
