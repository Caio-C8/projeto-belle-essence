import React, { useState, useEffect } from "react";

import { fetchApiPorId } from "../../../../api/requisicoes";

import { useAutenticacao } from "../../../contexto/AutenticarContexto";
import { useFavoritos } from "../../../contexto/FavoritosContexto";

import CardProduto from "../../../componentes/CardProduto/CardProduto";

const Favoritos = () => {
  const { usuario } = useAutenticacao();
  const { favoritos, carregarFavoritos } = useFavoritos();
  const [produtosFavoritos, setProdutosFavoritos] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      if (!usuario || favoritos.length === 0) {
        setProdutosFavoritos([]);
        return;
      }

      try {
        const detalhes = await Promise.all(
          favoritos.map((id) => fetchApiPorId("produtos", id))
        );
        setProdutosFavoritos(detalhes);
      } catch (error) {
        console.error("Erro ao carregar produtos favoritos:", error);
      }
    };

    carregarProdutos();
    carregarFavoritos();
  }, [usuario, favoritos]);

  return (
    <div className="d-flex flex-column gap-4">
      <h1>Produtos na Lista de Favoritos</h1>
      {produtosFavoritos.length === 0 ? (
        <div className="d-flex justify-content-center">
          <h3 className="align-self-center">
            Você não possui itens salvos na sua lista de favoritos.
          </h3>
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {produtosFavoritos.map((produto, index) => (
            <CardProduto
              key={index}
              produto={produto}
              isPaginaFavoritos={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
