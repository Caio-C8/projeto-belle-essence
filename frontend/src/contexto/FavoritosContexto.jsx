import { createContext, useContext, useEffect, useState } from "react";
import { useAutenticacao } from "./AutenticarContexto";
import { fetchApiPorId } from "../../api/requisicoes";

const FavoritosContexto = createContext();

export const ProvedorFavoritos = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const carregarFavoritos = async () => {
      if (!usuario) {
        setFavoritos([]);
        return;
      }

      try {
        const { dados } = await fetchApiPorId(
          "itens-lista-favoritos",
          usuario.id
        );
        const ids = dados.map((item) => item.id_produto);
        setFavoritos(ids);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    carregarFavoritos();
  }, [usuario]);

  const toggleFavorito = async (idProduto) => {
    if (!usuario) {
      alert("Você precisa estar logado para favoritar.");
      return false;
    }

    const idUsuario = usuario.id;
    const isFavorito = favoritos.includes(idProduto);

    try {
      const url = isFavorito
        ? `http://localhost:3000/desfavoritar-produto/${idUsuario}/${idProduto}`
        : "http://localhost:3000/favoritar-produto";

      const res = await fetch(url, {
        method: isFavorito ? "DELETE" : "POST",
        headers: isFavorito ? {} : { "Content-Type": "application/json" },
        body: isFavorito ? null : JSON.stringify({ idProduto, idUsuario }),
      });

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem);
        setFavoritos((prev) =>
          isFavorito
            ? prev.filter((id) => id !== idProduto)
            : [...prev, idProduto]
        );
        return true;
      } else {
        alert(mensagem);
        return false;
      }
    } catch (error) {
      alert("Erro de conexão ao atualizar favoritos.");
      console.error("Erro ao atualizar favorito:", error);
      return false;
    }
  };

  const contexto = { favoritos, toggleFavorito };

  return (
    <FavoritosContexto.Provider value={contexto}>
      {children}
    </FavoritosContexto.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContexto);
