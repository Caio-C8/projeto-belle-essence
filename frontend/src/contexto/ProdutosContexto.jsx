import { createContext, useContext, useState } from "react";
import { fetchApi, fetchApiPorId } from "../../api/requisicoes";

const ProdutosContexto = createContext();

export const ProvedorProdutos = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarTodosProdutos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await fetchApi("pesquisa/todos");
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar todos os produtos:", error);
      setErro("Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarPorCategoria = async (categoria) => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await fetchApiPorId("pesquisa/categoria", categoria);
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar por categoria:", error);
      setErro("Erro ao carregar categoria.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarPorTexto = async (pesquisa) => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await fetchApi(
        `pesquisa?pesq=${encodeURIComponent(pesquisa)}`
      );
      setProdutos(dados);
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
      const dados = await fetchApiPorId("pesquisa/relacionados", idProduto);
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar relacionados:", error);
      setErro("Erro ao carregar produtos relacionados.");
    } finally {
      setCarregando(false);
    }
  };

  const contexto = {
    produtos,
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
