import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useProdutos } from "../../../contexto/ProdutosContexto";
import Input from "../../../componentes/Campos/Input";

const DefinirPromocao = () => {
  const { produto, buscarProdutoPorCodigo } = useProdutos();

  const [codigoBusca, setCodigoBusca] = useState("");
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasPromocao, setHasPromocao] = useState(false);

  const handleBuscarProduto = async () => {
    if (!codigoBusca.trim()) {
      alert("Digite um código de produto para buscar.");
      return;
    }

    const resultado = await buscarProdutoPorCodigo(codigoBusca.trim());

    if (!resultado) {
      alert("Produto não encontrado.");
      setFormData({});
      setOriginalData({});
      setHasPromocao(false);
      return;
    }

    console.log("resultado: ", resultado);

    const novoFormData = {
      id_produto: resultado.id_produto,
      nome: resultado.nome || "",
      codigo_produto: resultado.codigo_produto || "",
      preco: resultado.preco || "",
      qtde_estoque: resultado.qtde_estoque || "",
      preco_promocao: resultado.preco_promocao || "",
      data_fim_promocao: resultado.data_fim_promocao
        ? resultado.data_fim_promocao.slice(0, 10)
        : "",
      banner_promocao: resultado.banner_promocao || "",
      descricao_promocao: resultado.descricao_promocao || "",
    };

    setFormData(novoFormData);
    setOriginalData(novoFormData);
    setHasPromocao(!!resultado.preco_promocao);
    setIsEditing(false);
  };

  const handleChange = (campo) => (e) => {
    setFormData({ ...formData, [campo]: e.target.value });
  };

  const handleEditar = () => {
    setOriginalData(JSON.parse(JSON.stringify(formData)));
    setIsEditing(true);
  };

  const handleCancelar = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSalvar = async () => {
    if (!formData.preco_promocao || !formData.data_fim_promocao) {
      alert("Preencha preço da promoção e data do fim da promoção.");
      return;
    }

    const houveMudanca =
      formData.preco_promocao !== originalData.preco_promocao ||
      formData.data_fim_promocao !== originalData.data_fim_promocao ||
      formData.banner_promocao !== originalData.banner_promocao ||
      formData.descricao_promocao !== originalData.descricao_promocao;

    if (!houveMudanca) {
      alert("Para salvar, mude pelo menos um campo.");
      return;
    }

    const isAlteracao = !!originalData.preco_promocao;

    try {
      const url = isAlteracao
        ? `http://localhost:3000/adm/alterar-promocao/${formData.id_produto}`
        : `http://localhost:3000/adm/cadastrar-promocao`;

      console.log("url: ", url);
      console.log("id: ", formData.id_produto);

      const metodo = isAlteracao ? "PUT" : "POST";

      const payload = {
        preco_promocao: parseFloat(
          String(formData.preco_promocao).replace(",", ".")
        ),
        data_fim_promocao: formData.data_fim_promocao,
        banner_promocao: formData.banner_promocao,
        descricao_promocao: formData.descricao_promocao,
        codigo_produto: formData.codigo_produto,
      };

      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const { mensagem } = await response.json();

      if (response.ok) {
        alert(mensagem);
        setIsEditing(false);
        setOriginalData(formData);
        setHasPromocao(true);
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar promoção.");
    }
  };

  const handleExcluirPromocao = async () => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja cancelar esta promoção?"
    );
    if (!confirmacao) return;

    try {
      const response = await fetch(
        `http://localhost:3000/adm/cancelar-promocao/${formData.id_produto}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const { mensagem } = await response.json();

      if (response.ok) {
        alert(mensagem || "Promoção cancelada com sucesso.");
        setFormData({
          ...formData,
          preco_promocao: "",
          data_fim_promocao: "",
          banner_promocao: "",
          descricao_promocao: "",
        });
        setOriginalData({
          ...originalData,
          preco_promocao: "",
          data_fim_promocao: "",
          banner_promocao: "",
          descricao_promocao: "",
        });
        setHasPromocao(false);
        setIsEditing(false);
      } else {
        alert(mensagem || "Erro ao cancelar promoção.");
      }
    } catch (error) {
      console.error("Erro ao cancelar promoção:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-5">
      <div className="w-100 d-flex flex-column align-items-center gap-3">
        <h3>Definir Promoções</h3>

        <div className="d-none d-md-flex col-md-6 justify-content-center">
          <div
            className="input-group rounded shadow-sm"
            style={{ maxWidth: "450px" }}
          >
            <input
              type="text"
              className="barra-pesquisa form-control border-0"
              placeholder="Código do produto"
              value={codigoBusca}
              onChange={(e) => setCodigoBusca(e.target.value)}
            />
            <button
              onClick={handleBuscarProduto}
              className="btn btn-barra-pesquisa input-group-text bg-white border-0"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </div>

      {produto && (
        <form className="mx-auto card shadow p-4">
          <div className="row divisoria mb-2">
            <h5>Dados do produto</h5>
          </div>

          <div className="row">
            <div className="col-md-6" style={{ paddingLeft: "0" }}>
              <Input
                disabled={true}
                label="Nome do produto:"
                type="text"
                value={formData.nome}
              />
            </div>

            <div className="col-md-6" style={{ paddingRight: "0" }}>
              <Input
                disabled={true}
                label="Código do produto:"
                type="text"
                value={formData.codigo_produto}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6" style={{ paddingLeft: "0" }}>
              <Input
                disabled={true}
                label="Preço base do produto:"
                type="text"
                value={formData.preco}
              />
            </div>

            <div className="col-md-6" style={{ paddingRight: "0" }}>
              <Input
                disabled={true}
                label="Quantidade no estoque:"
                type="text"
                value={formData.qtde_estoque}
              />
            </div>
          </div>

          <div className="row divisoria my-2">
            <h5>Dados da promoção</h5>
          </div>

          <Input
            label="Preço da promoção:"
            placeholder="100.0"
            type="number"
            value={formData.preco_promocao}
            onChange={handleChange("preco_promocao")}
            disabled={!isEditing}
          />

          <Input
            label="Data do fim da promoção:"
            type="date"
            value={formData.data_fim_promocao}
            onChange={handleChange("data_termino_promocao")}
            disabled={!isEditing}
          />

          <Input
            label="Banner da promoção:"
            placeholder="Link da imagem"
            type="text"
            value={formData.banner_promocao}
            onChange={handleChange("banner_promocao")}
            disabled={!isEditing}
          />

          <div className="mb-3">
            <label className="form-label">Descrição:</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Descrição da promoção:"
              value={formData.descricao_promocao}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descricao_promocao: e.target.value,
                })
              }
              style={{ resize: "none", maxHeight: "200px" }}
              disabled={!isEditing}
            ></textarea>
          </div>

          {isEditing ? (
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-salvar"
                onClick={handleSalvar}
              >
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-cancelar"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              {hasPromocao ? (
                <div className="d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditar}
                  >
                    Alterar Promoção
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancelar"
                    onClick={handleExcluirPromocao}
                  >
                    Excluir promoção
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditar}
                  >
                    Cadastrar Promoção
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancelar"
                    onClick={handleExcluirPromocao}
                  >
                    Excluir promoção
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default DefinirPromocao;
