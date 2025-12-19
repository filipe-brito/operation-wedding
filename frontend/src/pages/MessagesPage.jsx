import { useForm } from "react-hook-form";

const MessagesPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados da mensagem: ", data);
  };

  return (
    <div className="w-8/10 relative flex flex-col items-center px-5">
      <section className="w-full flex flex-col items-center text-[#99602b]">
        <h1 className="font-[EmilysCandy] text-5xl mb-10">
          Deixe sua mensagem de carinho para nós
        </h1>
        <p className="text-lg">
          Palavras são carinhos doados. Obrigado por nos dar o seu carinho.
          Iremos lembrar para sempre deste momento tão esperado.
        </p>
      </section>
      <section className="w-full flex flex-col items-center mt-10 mb-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-6 "
        >
          <div className="w-5/10 flex flex-col">
            <input
              type="text"
              placeholder="Nome completo"
              {...register("fullName", { required: true })}
              className="px-1 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
            )}
          </div>
          <div className="w-5/10 flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="px-1 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
            )}
          </div>
          <div className="w-5/10 h-40 flex flex-col">
            <textarea
              placeholder="Mensagem"
              {...register("message", { required: true })}
              className="px-1 h-full py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70 resize-x"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#63461a] text-white p-2 px-6 rounded"
          >
            Enviar Mensagem
          </button>
        </form>
      </section>
    </div>
  );
};

export default MessagesPage;
