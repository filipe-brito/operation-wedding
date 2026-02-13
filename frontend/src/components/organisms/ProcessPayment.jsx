import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import PaymentComponent from "./PaymentForm";
import { LoadingIcon, ReduceIcon, AddIcon, DeleteIcon } from "../atoms/Icons";

export const ProcessPayment = ({
  handlePaymentSuccess,
  handlePaymentFailure,
}) => {
  const { cart, totalValue, reduceQuantity, increaseQuantity, removeFromCart } =
    useCart();

  const [brickIsReady, setBrickIsReady] = useState(false);

  return (
    <div className="w-full mx-auto grid grid-cols-2 gap-12">
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

      {/* COLUNA DA DIREITA: O "Brick" do Mercado Pago */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        {!brickIsReady && (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingIcon className="animate-spin h-16 w-16 text-[#5a461a]" />
          </div>
        )}
        <div
          className={`transition-opacity duration-500 ${
            brickIsReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="font-marcellus text-xl mb-6 text-center">
            Pagamento Seguro
          </h2>
          <PaymentComponent
            amount={totalValue}
            items={cart}
            brickIsReady={setBrickIsReady}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={handlePaymentFailure}
          />
        </div>
      </div>
    </div>
  );
};
