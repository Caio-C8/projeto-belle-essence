import { createContext, useContext, useState } from "react";

import { fetchApi, fetchApiPorId } from "../../api/requisicoes";

import { useAutenticacao } from "./AutenticarContexto";

const ProdutosContexto = createContext();

export const ProvedorProdutos = ({ children }) => {
  const { usuario } = useAutenticacao();
  const tipoUsuario =
    usuario?.tipo === "admin"
      ? "admin"
      : usuario?.tipo === "cliente"
      ? "cliente"
      : null;
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({});
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

    params.append("tipoUsuario", tipoUsuario);

    return params.toString();
  };

  const buscarFiltrosDinamicos = async () => {
    try {
      const dados = await fetchApi("filtros");
      setFiltros(dados);
    } catch (error) {
      console.error("Erro ao buscar filtros dinâmicos:", error);
    }
  };

  const buscarTodosProdutos = async (filtrosAtivos = {}) => {
    setCarregando(true);
    setErro(null);
    try {
      const queryString = construirQueryString(filtrosAtivos);
      const url = queryString
        ? `pesquisa/todos?${queryString}`
        : "pesquisa/todos";
      const dados = await fetchApi(url);
      setProdutos(dados);

      if (!filtros) {
        await buscarFiltrosDinamicos();
      }
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

      const dados = await fetchApiPorId(
        "pesquisa/categoria",
        categoria + (queryString ? `?${queryString}` : "")
      );
      setProdutos(dados);

      // Busca filtros dinâmicos se ainda não foram carregados
      if (!filtros) {
        await buscarFiltrosDinamicos();
      }
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
      params.append("tipoUsuario", tipoUsuario);

      Object.entries(filtrosAtivos).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          params.append(key, value);
        }
      });

      const dados = await fetchApi(`pesquisa?${params.toString()}`);
      setProdutos(dados);

      // Busca filtros dinâmicos se ainda não foram carregados
      if (!filtros) {
        await buscarFiltrosDinamicos();
      }
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
      const dados = await fetchApiPorId(
        "pesquisa/relacionados",
        idProduto,
        tipoUsuario
      );
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar relacionados:", error);
      setErro("Erro ao carregar produtos relacionados.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarProdutoPorId = async (id) => {
    setCarregando(true);
    setErro(null);
    try {
      const dadosRequisitadosProduto = await fetchApiPorId(
        "produtos",
        id,
        tipoUsuario
      );
      setProduto(dadosRequisitadosProduto);
    } catch (error) {
      console.error("Erro ao buscar produto por id:", error);
      setErro("Erro ao carregar produto.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarCategoriasEOcasioesPorProduto = async (id) => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await fetchApiPorId(
        "produtos",
        `${id}/categorias-ocasioes`,
        tipoUsuario
      );
      return dados;
    } catch (error) {
      console.error("Erro ao buscar categorias/ocasiões:", error);
      setErro("Erro ao carregar categorias e ocasiões.");
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const contexto = {
    produtos,
    produto,
    filtros,
    carregando,
    erro,
    buscarTodosProdutos,
    buscarPorCategoria,
    buscarPorTexto,
    buscarRelacionados,
    buscarFiltrosDinamicos,
    buscarProdutoPorId,
    buscarCategoriasEOcasioesPorProduto,
  };

  return (
    <ProdutosContexto.Provider value={contexto}>
      {children}
    </ProdutosContexto.Provider>
  );
};

export const useProdutos = () => useContext(ProdutosContexto);
