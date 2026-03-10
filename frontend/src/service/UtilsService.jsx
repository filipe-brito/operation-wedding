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

export const ConfirmAttendance = async (data) => {
  try {
    const response = await api.post("/guests/confirm", data);
    return response.data;
  } catch (error) {
    console.warn("Erro ao confirmar presença: ", error.message);
    throw new Error("Erro ao confirmar presença");
  }
};
