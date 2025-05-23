import React, { useState, useEffect } from "react";
import "./CardProduto.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { formatarPreco } from "../../utilidades/formatarPreco";
import { useAutenticacao } from "../../contexto/AutenticarContexto";

const CardProduto = ({
  produto,
  isFavorito,
  atualizarFavoritos,
  favoritos,
  isPaginaFavoritos = false,
}) => {
  const [favorito, setFavorito] = useState(isFavorito);
  const { usuario } = useAutenticacao();
  const navigation = useNavigate();

  useEffect(() => {
    setFavorito(isFavorito);
  }, [isFavorito]);

  const toggleFavorito = async () => {
    const idProduto = produto.id_produto;

    if (!usuario) {
      alert("Para favoritar um produto você precisa estar logado.");
      return navigation("/login");
    }

    const idUsuario = usuario.id;

    try {
      const url = favorito
        ? `http://localhost:3000/desfavoritar-produto/${idUsuario}/${idProduto}`
        : "http://localhost:3000/favoritar-produto";

      const res = await fetch(url, {
        method: favorito ? "DELETE" : "POST",
        headers: favorito ? {} : { "Content-Type": "application/json" },
        body: favorito ? null : JSON.stringify({ idProduto, idUsuario }),
      });

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
        setFavorito(!favorito);

        if (favorito) {
          atualizarFavoritos(favoritos.filter((id) => id !== idProduto));
        } else {
          atualizarFavoritos([...favoritos, idProduto]);
        }
      } else {
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const desfavoritar = async () => {
    const idProduto = produto.id_produto;
    const idUsuario = usuario.id;

    try {
      const res = await fetch(
        `http://localhost:3000/desfavoritar-produto/${idUsuario}/${idProduto}`,
        {
          method: "DELETE",
          headers: {},
          body: null,
        }
      );

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);

        atualizarFavoritos(favoritos.filter((id) => id !== idProduto));
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
      <div className="card produto ">
        {isPaginaFavoritos ? (
          <div className="x-icon" onClick={desfavoritar}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        ) : (
          <div
            className={favorito ? "heart-icon ativo" : "heart-icon"}
            onClick={toggleFavorito}
          >
            <FontAwesomeIcon icon={favorito ? faHeartSolid : faHeart} />
          </div>
        )}

        <Link
          className="d-flex flex-column"
          to={`/produto/${produto.id_produto}`}
        >
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
                <>
                  <p className="fw-bold preco-principal">
                    {formatarPreco(produto.preco)}
                  </p>
                </>
              )}
            </div>
          </div>
        </Link>

        <div className="mt-auto">
          <button className="btn btn-primary w-100 rounded-pill btn-comprar">
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
