import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchApi } from "../../api/requisicoes";
import { normalizarTexto } from "../utilidades/normalizarTexto";

const CategoriasContexto = createContext();

export const ProvedorCategorias = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  const carregarCategorias = async () => {
    try {
      const dados = await fetchApi("categorias");

      const categoriasFormatadas = [
        { nomeOriginal: "Promoções", slug: "promocoes", tipo: "especial" },
        { nomeOriginal: "Lançamentos", slug: "lancamentos", tipo: "especial" },
        ...dados.map((cat) => ({
          nomeOriginal: cat.categoria,
          slug: normalizarTexto(cat.categoria),
          tipo: "categoria",
        })),
      ];

      setCategorias(categoriasFormatadas);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const buscarNomePorSlug = (slug) => {
    const categoria = categorias.find((c) => c.slug === slug);
    return categoria ? categoria.nomeOriginal : slug;
  };

  const contexto = {
    categorias,
    carregarCategorias,
    buscarNomePorSlug,
  };

  return (
    <CategoriasContexto.Provider value={contexto}>
      {children}
    </CategoriasContexto.Provider>
  );
};

export const useCategorias = () => useContext(CategoriasContexto);
