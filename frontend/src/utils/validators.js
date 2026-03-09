export const validators = {
  cellphone: {
    mask: (value) =>
      value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4"),
    validator: (value) => {
      if (!value) return true; // permite valor vazio
      return /^\(\d{2}\) \d{1} \d{4}-\d{4}$/.test(value) || "Celular inválido";
    },
  },
};
