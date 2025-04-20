import React, { useEffect, useState } from "react";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchCarrinho = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/carrinhos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const dados = await res.json();
          setCarrinho(dados);
        } else {
          const texto = await res.text();
          setMensagem(texto || "Erro ao buscar carrinho.");
        }
      } catch (err) {
        console.error("Erro:", err);
        setMensagem("Erro de conexão com o servidor.");
      }
    };

    fetchCarrinho();
  }, []);

  return (
    <div>
      <h1>Meu Carrinho</h1>
      {mensagem && <p>{mensagem}</p>}
      {carrinho && (
        <div>
          <p>ID do Carrinho: {carrinho.id_carrinho}</p>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
