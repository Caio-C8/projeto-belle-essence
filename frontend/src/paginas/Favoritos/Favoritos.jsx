import React, { useState, useEffect } from "react";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchFavoritos = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/listas-favoritos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const dados = await res.json();
          setFavoritos(dados);
        } else {
          const texto = await res.text();
          setMensagem(texto || "Erro ao buscar favoritos.");
        }
      } catch (err) {
        console.error("Erro:", err);
        setMensagem("Erro de conexão com o servidor.");
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <div>
      <h1>Minha Lista de Favoritos</h1>
      {mensagem && <p>{mensagem}</p>}
      {favoritos && (
        <div>
          <p>ID da lista: {favoritos.id_lista_favoritos}</p>
        </div>
      )}
    </div>
  );
};

export default Favoritos;
