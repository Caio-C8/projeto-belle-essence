import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { formatarPreco } from "../../utilidades/formatarPreco";

const CardProduto = ({ produto, index }) => {
  const [favorito, setFavorito] = useState(false);
  return (
    <div key={index} className="col-12 col-sm-6 col-md-3 px-2">
      <Link to="" className="card produto h-100">
        <div
          className={favorito ? "heart-icon ativo" : "heart-icon"}
          onClick={() => setFavorito((anterior) => !anterior)}
        >
          <FontAwesomeIcon icon={favorito ? faHeartSolid : faHeart} />
        </div>

        <img src={produto.imagem} className="card-img-top" alt={produto.nome} />

        <div className="card-body text-center d-flex flex-column gap-2">
          <p>{produto.marca}</p>
          <p className="nome-produto">{produto.nome}</p>
          {produto.promocao ? (
            <>
              <p className="text-decoration-line-through text-muted">
                {formatarPreco(produto.preco)}
              </p>
              <p className="fw-bold">{formatarPreco(produto.preco_promocao)}</p>
            </>
          ) : (
            <>
              <p className="fw-bold">{formatarPreco(produto.preco)}</p>
            </>
          )}

          <div className="mt-auto">
            <button className="btn btn-primary w-100 rounded-pill btn-comprar">
              Comprar Agora
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProduto;
