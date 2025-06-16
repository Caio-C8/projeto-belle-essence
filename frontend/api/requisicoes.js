export const fetchApi = async (endpoint) => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}`);

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const resposta = await res.json();

    return resposta;
  } catch (error) {
    console.error(`Erro ao buscar /${endpoint}:`, error);
    return null;
  }
};

export const fetchApiPorId = async (endpoint, id) => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}/${id}`);

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const resposta = await res.json();

    return resposta;
  } catch (error) {
    console.error(`Erro ao buscar /${endpoint}:`, error);
    return null;
  }
};
