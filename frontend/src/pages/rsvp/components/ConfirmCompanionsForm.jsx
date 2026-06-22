import { motion } from "framer-motion";
import { useFieldArray } from "react-hook-form";
import { LoadingIcon } from "../../../components/atoms/Icons";

export const ConfirmCompanionsForm = ({
  methods,
  confirmAttendance,
  buttonLoading,
}) => {
  // 2. ATIVAR O FIELD ARRAY USANDO O CONTROL DO PAI
  const { fields } = useFieldArray({
    control: methods.control,
    name: "companions", // Deve bater com a chave usada no defaultValue
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1.2,
      }}
      className="flex flex-col items-center justify-center gap-y-4 text-lg text-grafite"
    >
      <h1 className="text-2xl text-center font-bold text-olive">
        Olá, {methods.getValues("full_name")}. <br />
        Confirme abaixo a presença dos seus acompanhantes.
      </h1>
      <div className="md:w-1/2 p-2 rounded-md bg-black/10 text-center">
        <h1 className="text-terracota text-2xl font-bold">Atenção!</h1>
        <p>
          Caso algum acompanhante não esteja listado abaixo, por favor, entre em
          contato com os noivos.
        </p>
      </div>

      <div className="text-grafite space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="animate-slide-in-from-left flex p-2 border-2 border-grafite/50 rounded-md"
          >
            <div className="space-y-3 gap-4 grid grid-cols-2 md:grid-cols-3">
              <div className="col-span-2 md:col-span-1 flex flex-col">
                <label>{`Nome do ${index + 1}º acompanhante`}</label>
                <input
                  type="text"
                  readOnly
                  {...methods.register(`companions.${index}.full_name`, {
                    required: true,
                  })}
                  className="md:w-80 px-3 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
                />
              </div>

              <div className="flex flex-col md:items-center">
                <label className="text-nowrap">Estará na celebração?</label>
                <div className="flex gap-10 py-3">
                  <label className="hover:cursor-pointer">
                    <input
                      value="true"
                      type="radio"
                      className="mr-2 px-3"
                      {...methods.register(`companions.${index}.will_attend`, {
                        required: true,
                      })}
                    />
                    Sim
                  </label>
                  <label className="hover:cursor-pointer">
                    <input
                      type="radio"
                      value="false"
                      className="mr-2 px-3"
                      {...methods.register(`companions.${index}.will_attend`, {
                        required: true,
                      })}
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label>Data de nascimento</label>

                <input
                  type="date"
                  min="1910-01-01"
                  max="2030-12-31"
                  className="px-3 py-3 w-full outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
                  {...methods.register(`companions.${index}.date_of_birth`, {
                    required:
                      methods.watch(`companions.${index}.will_attend`) ===
                      "true",
                  })}
                />
              </div>

              {methods.formState.errors.companions?.[index]?.date_of_birth && (
                <p className="col-span-2 text-red-500 mt-1 animate-slide-in-from-left">
                  Data de nascimento do acompanhante é obrigatória.
                </p>
              )}

              {methods.formState.errors.companions?.[index]?.will_attend && (
                <p className="col-span-2 text-red-500 mt-1 animate-slide-in-from-left">
                  Confirme a presença do acompanhante.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        onClick={methods.handleSubmit(confirmAttendance)}
        className="w-40 h-12 bg-terracota text-white py-2 px-4 rounded flex items-center justify-center"
      >
        {buttonLoading ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          "Validar convite"
        )}
      </button>
    </motion.div>
  );
};
