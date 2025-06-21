export const fetchApi = async (endpoint, tipoUsuario = null) => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}`, {
      headers: tipoUsuario ? { "tipo-usuario": tipoUsuario } : {},
    });

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    const { dados } = await res.json();
    return dados;
  } catch (error) {
    console.error(`Erro ao buscar /${endpoint}:`, error);
    return null;
  }
};

export const fetchApiPorId = async (endpoint, id, tipoUsuario = null) => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      headers: tipoUsuario ? { "tipo-usuario": tipoUsuario } : {},
    });

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    const { dados } = await res.json();
    return dados;
  } catch (error) {
    console.error(`Erro ao buscar /${endpoint}/${id}:`, error);
    return null;
  }
};
