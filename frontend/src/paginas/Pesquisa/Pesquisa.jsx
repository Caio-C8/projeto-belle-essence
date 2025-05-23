import React, { useState, useEffect } from "react";
import { useAutenticacao } from "../../contexto/AutenticarContexto";
import { fetchApiPorId, fetchApi } from "../../../api/requisicoes";
import CardProduto from "../../componentes/CardProduto/CardProduto";

const Pesquisa = () => {
  const { usuario } = useAutenticacao();
  const [produtos, setProdutos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const dadosRequisitados = await fetchApi("produtos");
      setProdutos(dadosRequisitados);

      if (usuario) {
        const dados = await fetchApiPorId("itens-lista-favoritos", usuario.id);
        const idsProdutosFavoritos = dados.map((item) => item.id_produto);
        setFavoritos(idsProdutosFavoritos);
      }
    };

    carregarDados();
  }, [usuario]);

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
                // Remove dos favoritos
                const atualizados = favoritos.filter(
                  (id) => id !== novoFavorito
                );
                setFavoritos(atualizados);
              } else {
                // Adiciona nos favoritos
                setFavoritos([...favoritos, novoFavorito]);
              }
            }}
            favoritos={favoritos}
            isPaginaFavoritos={false} // 🔥 Aqui continua com coração, não X
          />
        ))}
      </div>
    </div>
  );
};

export default Pesquisa;
