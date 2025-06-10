import React from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../contexto/AutenticarContexto";
import { useFavoritos } from "../../../contexto/FavoritosContexto";
import "./Informacoes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { formatarPreco } from "../../../utilidades/formatarPreco";

const Informacoes = ({ produto }) => {
  const { usuario } = useAutenticacao();
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useFavoritos();

  const isFavorito = favoritos.includes(produto.id_produto);

  const handleToggleFavorito = async () => {
    if (!usuario) {
      alert("Você precisa estar logado para favoritar.");
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
      const res = await fetch(
        "http://localhost:3000/colocar-produtos-carrinho",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idProduto: produto.id_produto,
            idUsuario: usuario.id,
          }),
        }
      );

      const { mensagem } = await res.json();

      if (res.ok) {
        const confirmar = window.confirm(`${mensagem} Deseja ir ao carrinho?`);
        if (confirmar) navigate("/carrinho");
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro ao comprar:", error);
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start gap-5">
      <div className="mt-4 position-relative">
        {produto.promocao || produto.lancamento ? (
          <span className="tag-indicativo">
            {produto.promocao
              ? "Promoção"
              : produto.lancamento
              ? "Lançamento"
              : ""}
          </span>
        ) : (
          <></>
        )}
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="img-produto-detalhado"
        />
      </div>

      <div className="divisor"></div>

      {/* Right: Product Info */}
      <div className="mt-4 d-flex flex-column gap-1">
        <h3>{produto.nome}</h3>
        <p style={{ fontSize: "1.5rem" }}>{produto.marca}</p>

        {produto.promocao ? (
          <>
            <p
              className="text-decoration-line-through text-muted preco-secundario"
              style={{ fontSize: "1rem" }}
            >
              {formatarPreco(produto.preco)}
            </p>
            <p
              className="fw-bold preco-principal"
              style={{ fontSize: "1.3rem" }}
            >
              {formatarPreco(produto.preco_promocao)}
            </p>
          </>
        ) : (
          <>
            <p
              className="fw-bold preco-principal"
              style={{ fontSize: "1.3rem" }}
            >
              {formatarPreco(produto.preco)}
            </p>
          </>
        )}
        <div style={{ color: "grey" }}>
          Quantidade no Estoque: {produto.qtde_estoque}
        </div>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-primary"
            style={{ width: "150px", borderRadius: "30px" }}
            onClick={colocarCarrinho}
          >
            Comprar
          </button>

          <div className="icon-favorito" onClick={handleToggleFavorito}>
            <FontAwesomeIcon
              icon={isFavorito ? faHeartSolid : faHeart}
              style={{ fontSize: "1.2rem", color: isFavorito ? "red" : "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informacoes;
