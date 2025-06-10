import { createContext, useContext, useEffect, useState } from "react";
import { useAutenticacao } from "./AutenticarContexto";

const FavoritosContexto = createContext();

export const ProvedorFavoritos = ({ children }) => {
  const { usuario } = useAutenticacao();
  const [favoritos, setFavoritos] = useState([]);

  // Carrega os favoritos do usuário ao logar
  useEffect(() => {
    const carregarFavoritos = async () => {
      if (!usuario) {
        setFavoritos([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/itens-lista-favoritos/${usuario.id}`
        );
        const { dados } = await res.json();
        const ids = dados.map((item) => item.id_produto);
        setFavoritos(ids);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    carregarFavoritos();
  }, [usuario]);

  // Função para favoritar/desfavoritar
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

  return (
    <FavoritosContexto.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContexto.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContexto);
