import React, { useState } from "react";
import Input from "../../../componentes/Campos/Input";
import Select from "../../../componentes/Campos/Select";

const CadastrarProduto = () => {
  const [form, setForm] = useState({
    nome: "",
    codigo: "",
    marca: "",
    preco: "",
    estoque: "",
    familiaOlfativa: "",
    concentracao: "",
    categorias: "",
    ocasioes: "",
    banner: "",
    imagem: "",
    descricao: "",
    dataVencimento: "",
  });

  const handleChange = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/adm/cadastrar-produtos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const { mensagem } = await response.json();

      if (response.ok) {
        alert(mensagem || "Produto cadastrado com sucesso!");
        setForm({
          nome: "",
          codigo: "",
          marca: "",
          preco: "",
          estoque: "",
          familiaOlfativa: "",
          concentracao: "",
          categorias: "",
          ocasioes: "",
          banner: "",
          imagem: "",
          descricao: "",
          dataVencimento: "",
        });
      } else {
        alert(mensagem || "Erro ao cadastrar produto.");
      }
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <h3>Cadastrar novo produto</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border rounded shadow-sm p-4 d-flex flex-column gap-3"
        style={{ width: "800px", backgroundColor: "#fff" }}
      >
        <Input
          label="Nome do produto:"
          placeholder="Nome do produto"
          type="text"
          value={form.nome}
          onChange={handleChange("nome")}
        />

        <div className="row">
          <div className="col-md-6" style={{ paddingLeft: "0" }}>
            <Input
              label="Código do produto:"
              placeholder="Código do produto"
              type="text"
              value={form.codigo}
              onChange={handleChange("codigo")}
            />
          </div>

          <div className="col-md-6" style={{ paddingRight: "0" }}>
            <Input
              label="Marca do produto:"
              placeholder="Marca do produto"
              type="text"
              value={form.marca}
              onChange={handleChange("marca")}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6" style={{ paddingLeft: "0" }}>
            <Input
              label="Preço base do produto:"
              placeholder="Preço do produto"
              type="number"
              value={form.preco}
              onChange={handleChange("preco")}
            />
          </div>

          <div className="col-md-6" style={{ paddingRight: "0" }}>
            <Input
              label="Quantidade no estoque:"
              placeholder="Produtos no estoque"
              type="number"
              value={form.estoque}
              onChange={handleChange("estoque")}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6" style={{ paddingLeft: "0" }}>
            <Input
              label="Família olfativa:"
              placeholder="Família olfativa"
              type="text"
              value={form.familiaOlfativa}
              onChange={handleChange("familiaOlfativa")}
            />
          </div>

          <div className="col-md-6" style={{ paddingRight: "0" }}>
            <Input
              label="Concentração:"
              placeholder="Concentração"
              type="text"
              value={form.concentracao}
              onChange={handleChange("concentracao")}
            />
          </div>
        </div>

        <Input
          label="Data de vencimento:"
          type="date"
          value={form.dataVencimento}
          onChange={handleChange("dataVencimento")}
        />

        <Input
          label="Categorias:"
          placeholder="Categoria 1, Categoria 2..."
          type="text"
          value={form.categorias}
          onChange={handleChange("categorias")}
        />

        <Input
          label="Ocasiões:"
          placeholder="Ocasião 1, Ocasião 2..."
          type="text"
          value={form.ocasioes}
          onChange={handleChange("ocasioes")}
        />

        <div className="row">
          <div className="col-md-6" style={{ paddingLeft: "0" }}>
            <Input
              label="Banner do produto:"
              placeholder="Link da imagem"
              type="text"
              value={form.banner}
              onChange={handleChange("banner")}
            />
          </div>

          <div className="col-md-6" style={{ paddingRight: "0" }}>
            <Input
              label="Imagem do produto:"
              placeholder="Link da imagem"
              type="text"
              value={form.imagem}
              onChange={handleChange("imagem")}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Descrição do produto"
            value={form.descricao}
            onChange={handleChange("descricao")}
            style={{ resize: "none", maxHeight: "200px" }}
          ></textarea>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarProduto;
