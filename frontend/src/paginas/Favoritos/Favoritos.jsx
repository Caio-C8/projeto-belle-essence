import React, { useState, useEffect } from "react";
import { fetchApiPorId } from "../../../api/requisicoes";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import CardProduto from "../../componentes/CardProduto/CardProduto";

const Favoritos = () => {
  const [itensFavoritos, setItensFavoritos] = useState([]);
  const { usuario } = useAutenticacao();
  const idUsuario = usuario.id;

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitados = await fetchApiPorId(
        "itens-lista-favoritos",
        idUsuario
      );

      const produtosDetalhados = await Promise.all(
        dadosRequisitados.map(async (item) => {
          const produto = await fetchApiPorId("produtos", item.id_produto);
          return produto;
        })
      );

      setItensFavoritos(produtosDetalhados);
    };

    carregarDados();
  }, [idUsuario]);

  const idsFavoritos = itensFavoritos.map((produto) => produto.id_produto);

  return (
    <div className="d-flex flex-wrap">
      {itensFavoritos.length === 0 ? (
        <h1>Você não possui itens salvos na sua lista de favoritos.</h1>
      ) : (
        itensFavoritos.map((item, index) => (
          <CardProduto
            key={index}
            produto={item}
            isFavorito={true}
            atualizarFavoritos={(novosFavoritos) => {
              const atualizados = itensFavoritos.filter((produto) =>
                novosFavoritos.includes(produto.id_produto)
              );
              setItensFavoritos(atualizados);
            }}
            favoritos={idsFavoritos}
            isPaginaFavoritos={true}
          />
        ))
      )}
    </div>
  );
};

export default Favoritos;
