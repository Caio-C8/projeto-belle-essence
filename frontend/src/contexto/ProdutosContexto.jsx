import { createContext, useContext, useState } from "react";
import { fetchApi, fetchApiPorId } from "../../api/requisicoes";

const ProdutosContexto = createContext();

export const ProvedorProdutos = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const construirQueryString = (filtrosAtivos) => {
    const params = new URLSearchParams();

    Object.entries(filtrosAtivos).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.append(key, value);
      }
    });

    return params.toString();
  };

  const buscarTodosProdutos = async (filtrosAtivos = {}) => {
    setCarregando(true);
    setErro(null);
    try {
      const queryString = construirQueryString(filtrosAtivos);
      const url = queryString
        ? `pesquisa/todos?${queryString}`
        : "pesquisa/todos";
      const resposta = await fetchApi(url);

      setProdutos(resposta?.dados || []);
      setFiltros(resposta?.filtros || null);
    } catch (error) {
      console.error("Erro ao buscar todos os produtos:", error);
      setErro("Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarPorCategoria = async (categoria, filtrosAtivos = {}) => {
    setCarregando(true);
    setErro(null);
    try {
      const queryString = construirQueryString(filtrosAtivos);
      const url = queryString
        ? `pesquisa/categoria/${categoria}?${queryString}`
        : `pesquisa/categoria/${categoria}`;
      const resposta = await fetchApi(url);

      setProdutos(resposta?.dados || []);
      setFiltros(resposta?.filtros || null);
    } catch (error) {
      console.error("Erro ao buscar por categoria:", error);
      setErro("Erro ao carregar categoria.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarPorTexto = async (pesquisa, filtrosAtivos = {}) => {
    setCarregando(true);
    setErro(null);
    try {
      const params = new URLSearchParams();
      params.append("pesq", pesquisa);

      Object.entries(filtrosAtivos).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          params.append(key, value);
        }
      });

      const resposta = await fetchApi(`pesquisa?${params.toString()}`);

      setProdutos(resposta?.dados || []);
      setFiltros(resposta?.filtros || null);
    } catch (error) {
      console.error("Erro ao buscar por texto:", error);
      setErro("Erro na pesquisa.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarRelacionados = async (idProduto) => {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await fetchApiPorId("pesquisa/relacionados", idProduto);

      setProdutos(resposta?.dados || []);
      setFiltros(resposta?.filtros || null);
    } catch (error) {
      console.error("Erro ao buscar relacionados:", error);
      setErro("Erro ao carregar produtos relacionados.");
    } finally {
      setCarregando(false);
    }
  };

  const contexto = {
    produtos,
    filtros,
    carregando,
    erro,
    buscarTodosProdutos,
    buscarPorCategoria,
    buscarPorTexto,
    buscarRelacionados,
  };

  return (
    <ProdutosContexto.Provider value={contexto}>
      {children}
    </ProdutosContexto.Provider>
  );
};

export const useProdutos = () => useContext(ProdutosContexto);
