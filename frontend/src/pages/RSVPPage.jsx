import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import { AddIcon, DeleteIcon } from "../components/atoms/Icons";

const RSVPPage = () => {
  const { setIsLoading } = useLoading();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsLoading(true);
    const turnOff = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(turnOff);
  }, []);

  const onSubmit = (data) => {
    console.log("Dados da mensagem: ", data);
    console.log("Acompanhantes: ", fields);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companions",
  });

  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-6">Confirmação de Presença</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl">Insira seu número de telefone</h2>
          <input
            name="cellphone"
            type="tel"
            placeholder="ex: (00) 00000-0000"
            {...register("phone", { required: true })}
            className="px-1 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl">Acompanhantes</h2>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col gap-2 border border-[#5a461a]/30 p-2"
              >
                <div className="flex p-2 gap-5">
                  <div className="flex flex-col space-x-10">
                    <label>{`Nome do ${index + 1}º acompanhante`}</label>
                    <input
                      type="text"
                      {...register(`companions[${index}].full_name`, {
                        required: true,
                      })}
                      className="px-1 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Tem 7 anos de idade ou menos?</label>
                    <div className="flex gap-10 justify-center py-3">
                      <label>
                        <input
                          value="true"
                          type="radio"
                          className="mr-2"
                          {...register(`companions[${index}].is_underage`, {
                            required: true,
                          })}
                        />
                        Sim
                      </label>
                      <label>
                        <input
                          defaultChecked
                          type="radio"
                          value="false"
                          className="mr-2"
                          {...register(`companions[${index}].is_underage`, {
                            required: true,
                          })}
                        />
                        Não
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:bg-red-50 transition"
                    title="Remover"
                  >
                    <DeleteIcon />
                  </button>
                </div>

                {errors.companions?.[index] && (
                  <div className="flex flex-col">
                    {errors.companions?.[index]?.is_underage && (
                      <p className="text-red-500 text-xs mt-1">
                        Selecione uma opção.
                      </p>
                    )}
                    {errors.companions?.[index]?.full_name && (
                      <p className="text-red-500 text-xs mt-1">
                        Nome do acompanhante é obrigatório.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              append({ full_name: "", is_underage: null });
            }}
            disabled={fields.length >= 3}
            className="bg-[#63461a] mt-4 p-2 flex items-center gap-2 text-sm font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed hover:text-black transition"
          >
            <AddIcon />
            {fields.length === 0 ? "Adicionar acompanhante" : "Adicionar outro"}
          </button>

          <p className="mt-2 text-xs text-gray-400">
            Limite máximo de 3 acompanhantes.
          </p>
        </div>
        <button type="submit">teste</button>
      </form>
    </div>
  );
};

export default RSVPPage;
