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
  });

  const handleChange = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <h3>Cadastrar novo produto</h3>
      </div>

      <form
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
            <Select
              label="Família olfativa:"
              value={form.familiaOlfativa}
              onChange={handleChange("familiaOlfativa")}
              options={["Amadeirada", "Floral", "Frutal", "Oriental"]}
            />
          </div>

          <div className="col-md-6" style={{ paddingRight: "0" }}>
            <Select
              label="Concentração:"
              value={form.concentracao}
              onChange={handleChange("concentracao")}
              options={["Cologne", "Eau de Toilette", "Eau de Parfum"]}
            />
          </div>
        </div>

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
              placeholder="Clique aqui"
              type="text"
              value={form.banner}
              onChange={handleChange("banner")}
            />
          </div>

          <div className="col-md-6" style={{ paddingRight: "0" }}>
            <Input
              label="Imagem do produto:"
              placeholder="Clique aqui"
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
