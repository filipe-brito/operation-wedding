import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { LoadingIcon } from "../../../components/atoms/Icons";

export const ValidateInvitationForm = ({
  methods,
  validateInvitation,
  buttonLoading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1.2,
      }}
      className="w-full h-full flex flex-col text-grafite text-lg items-center"
    >
      <div className="w-full h-full flex flex-col gap-y-4 md:items-center">
        <div className="flex flex-col">
          <label className="">Insira seu número de telefone</label>
          <Controller
            name="phone"
            control={methods.control}
            rules={{
              required: "Campo obrigatório",
              minLength: {
                value: 11,
                message: "Digite o número completo com DDD",
              },
              maxLength: {
                value: 11,
                message: "O número não pode ter mais que 11 dígitos",
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <IMaskInput
                inputRef={ref}
                value={value}
                type="tel"
                mask="(00) 00000-0000"
                unmask={true}
                placeholder="ex: (00) 00000-0000"
                definitions={{
                  "#": /[1-9]/,
                }}
                onAccept={(unmaskedValue) => {
                  // Envia para o React Hook Form o valor sem (), - ou espaços
                  onChange(unmaskedValue);
                }}
                className="px-3 py-3 w-full md:w-80 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
              />
            )}
          />

          {methods.formState.errors.phone && (
            <p className="text-red-500 animate-slide-in-from-left">
              {methods.formState.errors.phone.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Código de convite</label>
          <input
            type="text"
            {...methods.register(`invite_code`, {
              required: true,
            })}
            className="px-3 py-3 w-full md:w-80 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
          />
          {methods.formState.errors.invite_code && (
            <p className="text-red-500 animate-slide-in-from-left">
              Este campo é obrigatório.
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Data de nascimento</label>

          <input
            type="date"
            min="1910-01-01"
            max="2030-12-31"
            className="px-3 py-3 w-full md:w-80 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
            {...methods.register(`date_of_birth`, {
              required: methods.watch("will_attend") === "true",
            })}
          />
          {methods.formState.errors.date_of_birth && (
            <p className="text-red-500 mt-1 animate-slide-in-from-left">
              Data de nascimento é obrigatória.
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4 text-[#3e3e2c] md:items-center">
          <div className="flex flex-col items-center">
            <label>Você irá à nossa celebração?</label>
            <div className="flex items-center whitespace-nowrap">
              <label
                htmlFor="will_attend_yes"
                className="hover:cursor-pointer px-1 py-2 "
              >
                <input
                  id="will_attend_yes"
                  value="true"
                  type="radio"
                  className="mr-2 px-3"
                  {...methods.register(`will_attend`, {
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
                  {...methods.register(`will_attend`, {
                    required: true,
                  })}
                />
                Não
              </label>
            </div>
          </div>

          {methods.formState.errors.will_attend && (
            <p className="text-red-500 animate-slide-in-from-left">
              Este campo é obrigatório.
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        onClick={methods.handleSubmit(validateInvitation)}
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
