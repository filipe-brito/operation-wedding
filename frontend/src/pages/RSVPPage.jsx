import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import { AddIcon, DeleteIcon } from "../components/atoms/Icons";
import { ConfirmAttendance } from "../service/UtilsService";

const RSVPPage = () => {
  const { setIsLoading } = useLoading();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsLoading(true);
    const turnOff = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(turnOff);
  }, []);

  const willAttend = watch("will_attend");

  useEffect(() => {
    if (willAttend === "false") {
      remove();
    }
  }, [willAttend]);

  const onSubmit = async (data) => {
    console.log("Dados da mensagem: ", data);
    console.log("Acompanhantes: ", fields);

    try {
      setIsLoading(true);
      const response = await ConfirmAttendance(data);
      setIsLoading(false);
    } catch (error) {
      console.warn("Erro ao confirmar presença: ", error.message);
      setIsLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companions",
  });

  return (
    <div className="w-8/10 flex flex-col items-center text-[#7E8C54] font-[Reboto]">
      <h1 className="text-4xl font-[GreatVibes] font-bold mb-6">
        Confirmação de Presença
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-5/10 flex flex-col">
        <div className="flex flex-col space-y-4 text-sm">
          <div className="flex flex-col">
            <h2 className="">Insira seu número de telefone</h2>
            <input
              name="cellphone"
              type="tel"
              placeholder="ex: (00) 00000-0000"
              {...register("phone", { required: true })}
              className="text-[#06402B] px-3 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label>Você irá à nossa celebração?</label>
            <div className="flex gap-4">
              <label
                htmlFor="will_attend_yes"
                className="hover:cursor-pointer px-1 py-2 "
              >
                <input
                  id="will_attend_yes"
                  value="true"
                  type="radio"
                  className="mr-2 px-3"
                  {...register(`will_attend`, {
                    required: true,
                  })}
                />
                Sim
              </label>
              <label
                htmlFor="will_attend_not"
                className="hover:cursor-pointer px-1 py-2"
              >
                <input
                  id="will_attend_not"
                  type="radio"
                  value="false"
                  className="mr-2 px-3 hover:cursor-pointer"
                  {...register(`will_attend`, {
                    required: true,
                  })}
                />
                Não
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-sm">Acompanhantes</h2>
          <div className="flex flex-col border border-[#5a461a]/30">
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="animate-fade-in-right flex flex-col gap-2 p-2"
                >
                  <div className="flex p-2 gap-5">
                    <div className="flex flex-col space-x-10">
                      <label>{`Nome do ${index + 1}º acompanhante`}</label>
                      <input
                        type="text"
                        {...register(`companions[${index}].full_name`, {
                          required: true,
                        })}
                        className="px-3 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label>Tem 7 anos de idade ou menos?</label>
                      <div className="flex gap-10 justify-center py-3">
                        <label>
                          <input
                            value="true"
                            type="radio"
                            className="mr-2 px-3 hover:cursor-pointer"
                            {...register(`companions[${index}].is_underage`, {
                              required: true,
                            })}
                          />
                          Sim
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="false"
                            className="mr-2 px-3 hover:cursor-pointer"
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
                      className="p-2 text-[#535C39]/80 hover:scale-120 transition duration-300 cursor-pointer"
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
            <div className="flex flex-col w-full items-center mt-4">
              <button
                type="button"
                onClick={() => {
                  append({ full_name: "", is_underage: null });
                }}
                disabled={fields.length >= 3 || willAttend === "false"}
                className="bg-[#7E8C54] active:animate-jelly cursor-pointer w-60 p-2 flex items-center justify-center gap-2 text-sm font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#535C39] transition duration-300"
              >
                <AddIcon />
                {fields.length === 0
                  ? "Adicionar acompanhante"
                  : "Adicionar outro"}
              </button>
              <p className="mt-2 text-xs text-gray-400">
                Limite máximo de 3 acompanhantes.
              </p>
            </div>
          </div>
        </div>

        <button type="submit">teste</button>
      </form>
    </div>
  );
};

export default RSVPPage;
