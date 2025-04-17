export const fetchApi = async (endpoint) => {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error(`Erro ao buscar /${endpoint}:`, error);
    return null;
  }
};
