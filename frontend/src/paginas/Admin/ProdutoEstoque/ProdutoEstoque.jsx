import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useProdutos } from "../../../contexto/ProdutosContexto";

import Input from "../../../componentes/Campos/Input";
import Select from "../../../componentes/Campos/Select";

const ProdutoEstoque = () => {
  const { id } = useParams();
  const { produto, buscarProdutoPorId, buscarCategoriasEOcasioesPorProduto } =
    useProdutos();

  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [categorias, setCategorias] = useState("");
  const [ocasioes, setOcasioes] = useState("");
  const [ativo, setAtivo] = useState(true);

  const buscarCategoriasEOcasioes = async () => {
    const dados = await buscarCategoriasEOcasioesPorProduto(id);
    if (dados) {
      setCategorias(dados.categorias.join(", "));
      setOcasioes(dados.ocasioes.join(", "));
    }
  };

  useEffect(() => {
    buscarProdutoPorId(id);
    buscarCategoriasEOcasioes();
  }, [id]);

  useEffect(() => {
    if (produto && produto.id_produto) {
      setFormData({
        imagem: produto.imagem || "",
        banner: produto.banner || "",
        familia_olfativa: produto.familia_olfativa || "",
        concentracao: produto.concentracao || "",
        data_vencimento: produto.data_vencimento
          ? produto.data_vencimento.slice(0, 10)
          : "",
        nome: produto.nome || "",
        codigo_produto: produto.codigo_produto || "",
        marca: produto.marca || "",
        preco: produto.preco || "",
        categorias: categorias,
        ocasioes: ocasioes,
        qtde_estoque: produto.qtde_estoque || "",
        descricao: produto.descricao || "",
      });

      setOriginalData({
        imagem: produto.imagem || "",
        banner: produto.banner || "",
        familia_olfativa: produto.familia_olfativa || "",
        concentracao: produto.concentracao || "",
        data_vencimento: produto.data_vencimento
          ? produto.data_vencimento.slice(0, 10)
          : "",
        nome: produto.nome || "",
        codigo_produto: produto.codigo_produto || "",
        marca: produto.marca || "",
        preco: produto.preco || "",
        categorias: categorias,
        ocasioes: ocasioes,
        qtde_estoque: produto.qtde_estoque || "",
        descricao: produto.descricao || "",
      });

      setAtivo(produto.ativo !== false);
    }
  }, [produto, categorias, ocasioes]);

  const handleChange = (campo) => (e) => {
    setFormData({ ...formData, [campo]: e.target.value });
  };

  const handleEditar = () => setIsDisabled(false);

  const handleCancelar = () => {
    setFormData({ ...originalData });
    setIsDisabled(true);
  };

  const handleSalvar = async () => {
    const camposAlterados = {};

    Object.keys(formData).forEach((campo) => {
      if (formData[campo] !== originalData[campo]) {
        camposAlterados[campo] = formData[campo];
      }
    });

    if (Object.keys(camposAlterados).length === 0) {
      alert("Nenhuma alteração feita.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/adm/alterar-produto/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(camposAlterados),
        }
      );

      const { mensagem } = await response.json();

      if (response.ok) {
        alert(mensagem || "Produto atualizado com sucesso.");
        setIsDisabled(true);

        // Atualiza localmente os estados
        const novoOriginalData = { ...originalData, ...camposAlterados };
        setOriginalData(novoOriginalData);
        setFormData(novoOriginalData);

        // Atualiza categorias e ocasiões separadamente
        if (camposAlterados.categorias !== undefined) {
          setCategorias(camposAlterados.categorias);
        }
        if (camposAlterados.ocasioes !== undefined) {
          setOcasioes(camposAlterados.ocasioes);
        }
      } else {
        alert(mensagem || "Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  const handleToggleAtivo = async () => {
    const acao = ativo ? "desativar" : "ativar";
    const confirmacao = window.confirm(
      `Tem certeza que deseja ${acao} este produto?`
    );
    if (!confirmacao) return;

    const rota = ativo
      ? `http://localhost:3000/adm/desativar-produto/${id}`
      : `http://localhost:3000/adm/ativar-produto/${id}`;

    try {
      const response = await fetch(rota, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { mensagem } = await response.json();

      if (response.ok) {
        alert(mensagem || `Produto ${acao} com sucesso.`);
        setAtivo(!ativo);
      } else {
        alert(mensagem || `Erro ao ${acao} o produto.`);
      }
    } catch (error) {
      console.error(`Erro ao ${acao} produto:`, error);
      alert(`Erro na conexão ao tentar ${acao}.`);
    }
  };

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h3>Informações do Produto</h3>

      <div className="border rounded shadow-sm hover-shadow p-4">
        <div className="row row-gap-4">
          <div className="col-md-6 d-flex flex-column gap-4 justify-content-between">
            <img
              src={formData.imagem}
              alt={formData.nome}
              className="img-fluid border rounded"
              style={{ height: "auto", width: "250px" }}
            />

            <Input
              disabled={isDisabled}
              label="Imagem do produto:"
              type="text"
              value={formData.imagem}
              onChange={handleChange("imagem")}
            />

            <Input
              disabled={isDisabled}
              label="Banner do produto:"
              type="text"
              value={formData.banner}
              onChange={handleChange("banner")}
            />

            <Input
              disabled={isDisabled}
              label="Família olfativa:"
              type="text"
              value={formData.familia_olfativa}
              onChange={handleChange("familia_olfativa")}
            />

            <Input
              disabled={isDisabled}
              label="Concentração:"
              type="text"
              value={formData.concentracao}
              onChange={handleChange("concentracao")}
            />

            <Input
              disabled={isDisabled}
              label="Data de vencimento:"
              type="date"
              value={formData.data_vencimento}
              onChange={handleChange("data_vencimento")}
            />
          </div>

          <div className="col-md-6 d-flex flex-column gap-4 justify-content-between">
            <Input
              disabled={true}
              label="Status:"
              type="text"
              value={ativo ? "Ativado" : "Desativado"}
              onChange={null}
            />

            <Input
              disabled={isDisabled}
              label="Nome do produto:"
              type="text"
              value={formData.nome}
              onChange={handleChange("nome")}
            />

            <Input
              disabled={isDisabled}
              label="Código do produto:"
              type="text"
              value={formData.codigo_produto}
              onChange={handleChange("codigo_produto")}
            />

            <Input
              disabled={isDisabled}
              label="Marca do produto:"
              type="text"
              value={formData.marca}
              onChange={handleChange("marca")}
            />

            <Input
              disabled={isDisabled}
              label="Preço base do produto:"
              type="number"
              value={formData.preco}
              onChange={handleChange("preco")}
            />

            <Input
              disabled={isDisabled}
              label="Ocasiões:"
              type="text"
              value={formData.ocasioes}
              onChange={handleChange("ocasioes")}
            />

            <Input
              disabled={isDisabled}
              label="Categorias:"
              type="text"
              value={formData.categorias}
              onChange={handleChange("categorias")}
            />

            <Input
              disabled={isDisabled}
              label="Quantidade no estoque:"
              type="number"
              value={formData.qtde_estoque}
              onChange={handleChange("qtde_estoque")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descrição:</label>
            <textarea
              className="form-control"
              rows="4"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              disabled={isDisabled}
              style={{ resize: "none", height: "200px" }}
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          {isDisabled ? (
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary"
                style={{ width: "200px", fontSize: "1.3rem" }}
                onClick={handleEditar}
              >
                Editar
              </button>

              <button
                className={`btn ${ativo ? "btn-cancelar" : "btn-salvar"}`}
                style={{ width: "200px", fontSize: "1.3rem" }}
                onClick={handleToggleAtivo}
              >
                {ativo ? "Desativar" : "Ativar"}
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-salvar"
                style={{ width: "200px", fontSize: "1.3rem" }}
                onClick={handleSalvar}
              >
                Salvar
              </button>

              <button
                className="btn btn-cancelar"
                style={{ width: "200px", fontSize: "1.3rem" }}
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutoEstoque;
