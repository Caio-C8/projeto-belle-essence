import React from "react";
import { Link } from "react-router-dom";

import { formatarPreco } from "../../../../utilidades/formatarPreco";
import { formatarData } from "../../../../utilidades/formatarData";

const CardProdutoEstoque = ({ produto }) => {
  return (
    <div className="produto-card border shadow-sm hover-shadow">
      <div className="produto-card-header">
        <div>
          <h3>{produto.nome}</h3>
        </div>
        {produto.qtde_estoque > 10 ? (
          <span className="estoque alto">ESTOQUE ALTO</span>
        ) : produto.qtde_estoque > 5 && produto.qtde_estoque <= 10 ? (
          <span className="estoque medio">ESTOQUE MÉDIO</span>
        ) : produto.qtde_estoque > 0 && produto.qtde_estoque <= 5 ? (
          <span className="estoque baixo">ESTOQUE BAIXO</span>
        ) : (
          <span className="sem estoque">SEM ESTOQUE</span>
        )}
      </div>
      <div className="produto-card-body">
        <div className="produto-card-img">
          <img
            className="img-produto border"
            src={produto.imagem}
            alt={produto.nome}
          />
        </div>
        <div className="produto-detalhes">
          <div className="coluna">
            <div>
              <strong>Código:</strong> {produto.codigo_produto}
            </div>
            <div>
              <strong>Marca:</strong> {produto.marca}
            </div>
            <div>
              <strong>Promoção:</strong> {produto.promocao ? "Sim" : "Não"}
            </div>
            <div>
              <strong>Valor Base:</strong> {formatarPreco(produto.preco)}
            </div>
            <div>
              <strong>Data de Vencimento:</strong>{" "}
              {produto.data_vencimento
                ? formatarData(produto.data_vencimento)
                : "-"}
            </div>
          </div>
          <div className="coluna">
            <div>
              <strong>Quantidade em Estoque:</strong> {produto.qtde_estoque}
            </div>
            <div>
              <strong>Número de vendas:</strong> {produto.numero_vendas}
            </div>
            <div>
              <strong>Lançamento:</strong> {produto.lancamento ? "Sim" : "Não"}
            </div>
            <div>
              <strong>Valor Promocional:</strong>{" "}
              {produto.promocao ? formatarPreco(produto.preco_promocao) : "-"}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              {produto.ativo ? "Ativado" : "Desativado"}
            </div>
          </div>
          <Link
            to={`/adm/estoque/produto/${produto.id_produto}`}
            className="botao-produto"
          >
            <button className="btn btn-primary">Ver Produto</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProdutoEstoque;
