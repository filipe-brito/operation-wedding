import { useForm } from "react-hook-form";
import { ReduceIcon, AddIcon, DeleteIcon } from "../atoms/Icons";
import { useCart } from "../../context/CartContext";

export const GiftReview = ({ setPaymentStatus }) => {
  const {
    cart,
    totalValue,
    reduceQuantity,
    increaseQuantity,
    removeFromCart,
    setDonorName,
    setMessage,
  } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setDonorName(data.fullName);
    setMessage(data.message);
    setPaymentStatus("process");
    console.log("Dados da mensagem: ", cart);
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
      <div className="w-full mx-auto grid grid-cols-2 gap-12">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-white p-6 rounded-xl shadow-sm border border-stone-100"
        >
          <h1 className="font-marcellus text-3xl text-[#5a461a] mb-8">
            Seus Dados
          </h1>
          <label htmlFor="" className="flex flex-col">
            <span className="text-[#99602b]">Seu nome</span>
            <input
              type="text"
              {...register("fullName", { required: true })}
              className="px-1 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
            )}
          </label>
          <label htmlFor="" className="flex flex-col mt-4">
            <span className="text-[#99602b]">Nos deixe uma mensagem</span>
            <textarea
              rows="4"
              cols="50"
              maxLength={500}
              {...register("message", { required: false })}
              className="px-1 py-3 outline-none border border-[#5a461a]/30 focus:border-[#5a461a]/70"
            />
          </label>
        </form>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <h1 className="font-marcellus text-3xl text-[#5a461a] mb-8">
            Resumo dos Presentes
          </h1>

          <div className="space-y-4 flex-col">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 py-4 border-b border-stone-200"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="w-full">
                  <div className="flex gap-4 justify-between items-center pb-2">
                    <span className="font-josefin text-stone-700">
                      {item.name}
                    </span>
                    <span className="font-josefin font-semibold text-stone-700 ml-auto">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex">
                    <div className="h-6 flex gap-4 p-2 text-[#5a461a] items-center justify-center border-1 rounded-md">
                      <button
                        className="cursor-pointer"
                        onClick={() => reduceQuantity(item)}
                      >
                        <ReduceIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => increaseQuantity(item)}
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="ml-auto text-4xl text-[#5a461a]/70 hover:text-[#5a461a] w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex font-josefin justify-between items-center pt-4 text-[#5a461a] text-3xl font-bold">
            <span>Total:</span>
            <span>R$ {totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full m-5 justify-center">
        <button
          type="submit"
          form="form"
          className="w-5/10 py-3 bg-[#575b43] text-white font-josefin rounded-lg 
                     hover:bg-[#4a3a15] transition-colors duration-200 
                     text-sm uppercase tracking-widest font-medium cursor-pointer"
        >
          Confirmar presentes
        </button>
      </div>
    </div>
  );
};
