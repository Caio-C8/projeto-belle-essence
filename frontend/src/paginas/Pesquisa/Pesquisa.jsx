import React, { useState } from "react";
import CardProduto from "../../componentes/CardProduto/CardProduto";
import { useProdutos } from "../../contexto/ProdutoContexto";

const Pesquisa = () => {
  const { produtos } = useProdutos();
  const [favoritos, setFavoritos] = useState([]);

  return (
    <div className="container d-flex flex-column gap-3">
      <h1>Resultado da Pesquisa</h1>

      <div className="row">
        {produtos.map((produto, index) => (
          <CardProduto
            key={index}
            produto={produto}
            isFavorito={favoritos.includes(produto.id_produto)}
            atualizarFavoritos={(novoFavorito) => {
              if (favoritos.includes(novoFavorito)) {
                const atualizados = favoritos.filter(
                  (id) => id !== novoFavorito
                );
                setFavoritos(atualizados);
              } else {
                setFavoritos([...favoritos, novoFavorito]);
              }
            }}
            favoritos={favoritos}
            isPaginaFavoritos={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Pesquisa;
