import api from "@/api/api";

export const FetchGiftCatalog = async () => {
  try {
    const response = await api.get("/gifts/catalog");
    return response.data;
  } catch (error) {
    console.warn("Erro ao buscar catálogo de Presentes: ", error.message);
    throw new Error("Erro ao buscar catálogo de Presentes");
  }
};
