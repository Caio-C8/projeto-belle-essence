import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { formatarPreco } from "../../utilidades/formatarPreco";

import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { useFavoritos } from "../../contexto/FavoritosContexto";

import { useCarrinho } from "../../contexto/CarrinhoContexto";

const CardProduto = ({ produto, isPaginaFavoritos = false }) => {
  const { usuario } = useAutenticacao();
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { adicionarProduto } = useCarrinho();

  const isFavorito = favoritos.includes(produto.id_produto);

  const handleFavoritar = async () => {
    if (!usuario) {
      alert("Você precisa estar logado para favoritar um produto.");
      return navigate("/login");
    }

    await toggleFavorito(produto.id_produto);
  };

  const colocarCarrinho = async () => {
    if (!usuario) {
      alert("Você precisa estar logado para comprar.");
      return navigate("/login");
    }

    try {
      const res = await adicionarProduto(produto.id_produto);

      const { mensagem } = await res.json();

      if (res.ok) {
        const confirmar = window.confirm(
          `${mensagem}. Deseja finalizar compra?`
        );

        if (confirmar) return navigate("/carrinho");
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="col-12 col-sm-6 col-md-3 px-2">
      <div className="card produto">
        {isPaginaFavoritos ? (
          <div className="x-icon" onClick={handleFavoritar}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        ) : (
          <div
            className={isFavorito ? "heart-icon ativo" : "heart-icon"}
            onClick={handleFavoritar}
          >
            <FontAwesomeIcon
              icon={isFavorito ? faHeartSolid : faHeartOutline}
            />
          </div>
        )}
        <Link to={`/produto/${produto.id_produto}`}>
          <div className="d-flex flex-column">
            <img
              src={produto.imagem}
              className="card-img-top"
              alt={produto.nome}
            />

            <div className="card-body d-flex flex-column flex-grow-1">
              <div>
                <p className="text-muted">{produto.marca}</p>
                <p className="nome-produto">{produto.nome}</p>
              </div>

              <div className="mt-auto">
                {produto.promocao ? (
                  <>
                    <p className="text-decoration-line-through text-muted preco-secundario">
                      {formatarPreco(produto.preco)}
                    </p>
                    <p className="fw-bold preco-principal">
                      {formatarPreco(produto.preco_promocao)}
                    </p>
                  </>
                ) : (
                  <p className="fw-bold preco-principal">
                    {formatarPreco(produto.preco)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-auto">
          <button
            onClick={colocarCarrinho}
            className="btn btn-primary w-100 rounded-pill btn-comprar"
          >
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
