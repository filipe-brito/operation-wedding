import { useForm } from "react-hook-form";
import {
  ReduceIcon,
  AddIcon,
  DeleteIcon,
} from "../../../components/atoms/Icons";
import { useCart } from "../../../context/CartContext";

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
    setPaymentStatus("captcha");
    console.log("Dados da mensagem: ", cart);
  };
  return (
    <div className="md:w-8/10 flex flex-col bg-white text-base shadow-sm rounded-xl m-2 md:mx-auto">
      <div className="flex flex-col p-2 md:grid md:grid-cols-2 gap-4">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-2 border rounded-xl border-stone-300"
        >
          <h1 className="font-marcellus text-3xl text-grafite mb-8">
            Seus Dados
          </h1>
          <div className="flex flex-col">
            <span className="text-grafite">Seu nome</span>
            <input
              type="text"
              {...register("fullName", { required: true })}
              className="px-1 py-3 outline-none border border-grafite/30 focus:border-grafite/70"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">Este campo é obrigatório.</p>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-grafite">Nos deixe uma mensagem</span>
            <textarea
              rows="4"
              cols="50"
              maxLength={500}
              {...register("message", { required: false })}
              className="px-1 py-3 outline-none border border-grafite/30 focus:border-grafite/70"
            />
          </div>
        </form>

        <div className="rounded-xl flex flex-col border border-grafite/20 p-2">
          <h1 className="font-marcellus text-3xl mb-8">Resumo dos presentes</h1>
          <div className="flex flex-col">
            {cart.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 py-4 border-b border-stone-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="md:size-20 object-cover rounded-md"
                />

                <div className="col-span-2 flex flex-col p-1">
                  <span className="h-1/2 font-josefin">{item.name}</span>
                  <div className="w-max mt-2 px-2 flex gap-4 items-center justify-center border-1 rounded-md">
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
                </div>
                <div className="flex flex-col p-1">
                  <span className="font-josefin font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item)}
                    className="w-max mx-auto text-4xl text-grafite/70 hover:text-grafite border-2 rounded-md cursor-pointer"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full font-josefin text-center text-3xl font-bold mt-8">
            <span>Total:</span>
            <span className="ml-20">R$ {totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full m-5">
        <button
          type="submit"
          form="form"
          className="w-50 py-3 bg-olive text-white font-josefin rounded-lg 
                     hover:bg-[#4a3a15] transition-colors duration-200 
                     text-sm uppercase tracking-widest font-medium cursor-pointer"
        >
          Confirmar presentes
        </button>
      </div>
    </div>
  );
};
