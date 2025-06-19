import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useProdutos } from "../../../contexto/ProdutosContexto";

import Input from "../../../componentes/Campos/Input";
import Select from "../../../componentes/Campos/Select";

const ProdutoEstoque = () => {
  const { id } = useParams();
  const { produto, buscarProdutoPorId } = useProdutos();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    buscarProdutoPorId(id);
  }, [id]);

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h3 className="">Informações do Produto</h3>

      <div className="border rounded shadow-sm hover-shadow p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="img-fluid border rounded w-100"
                style={{ maxHeight: "200px" }}
              />
            </div>
            <Input
              disabled={isDisabled}
              label="Imagem do produto:"
              type="text"
              value={produto.imagem}
              onChange={() => {}}
            />
            <Input
              disabled={isDisabled}
              label="Banner do produto:"
              type="text"
              value={produto.banner}
              onChange={() => {}}
            />

            <Select
              disabled={isDisabled}
              label="Família olfativa:"
              value={produto.familia_olfativa}
              onChange={() => {}}
              options={["Amadeirada", "Floral", "Frutal", "Oriental"]}
            />

            <Select
              disabled={isDisabled}
              label="Concentração:"
              value={produto.concentracao}
              onChange={() => {}}
              options={["Cologne", "Eau de Toilette", "Eau de Parfum"]}
            />
          </div>

          <div className="col-md-6">
            <Input
              disabled={isDisabled}
              label="Nome do produto:"
              type="text"
              value={produto.nome}
              onChange={() => {}}
            />
            <Input
              disabled={isDisabled}
              label="Código do produto:"
              type="text"
              value={produto.codigo_produto}
              onChange={() => {}}
            />
            <Input
              disabled={isDisabled}
              label="Marca do produto:"
              type="text"
              value={produto.marca}
              onChange={() => {}}
            />
            <Input
              disabled={isDisabled}
              label="Preço base do produto:"
              type="text"
              value={`R$ ${produto.preco}`}
              onChange={() => {}}
            />

            <Input
              disabled={isDisabled}
              label="Ocasiões:"
              type="text"
              value={produto.ocasiao}
              onChange={() => {}}
            />
            <Input
              disabled={isDisabled}
              label="Categorias:"
              type="text"
              value={produto.categoria}
              onChange={() => {}}
            />
            <Input
              disabled={isDisabled}
              label="Quantidade no estoque:"
              type="number"
              value={produto.qtde_estoque}
              onChange={() => {}}
            />
          </div>

          <div className="row"></div>

          <div className="mb-3">
            <label className="form-label">Descrição:</label>
            <textarea
              className="form-control"
              rows="4"
              value={produto.descricao}
              onChange={() => {}}
              disabled={isDisabled}
            ></textarea>
          </div>
        </div>

        {/* Botão Editar */}
        <div className="text-center">
          <button className="btn btn-warning">Editar</button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoEstoque;
