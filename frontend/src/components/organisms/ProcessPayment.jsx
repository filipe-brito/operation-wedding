import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import PaymentComponent from "./PaymentForm";
import { LoadingIcon } from "../atoms/Icons";

export const ProcessPayment = ({
  handlePaymentSuccess,
  handlePaymentFailure,
}) => {
  const { cart, totalValue } = useCart();

  const [brickIsReady, setBrickIsReady] = useState(false);

  const cartDescription = cart.map((item) => item.name).join(", ");

  return (
    <div className="w-full mx-auto grid grid-cols-2 gap-12">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        <h1 className="font-marcellus text-3xl text-[#5a461a] mb-8">
          Resumo dos Presentes
        </h1>

        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-stone-200 pb-2"
            >
              <span className="font-josefin text-stone-700">{item.name}</span>
              <span className="font-josefin font-semibold">
                R$ {item.price.toFixed(2)}
              </span>
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-md ml-4"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="font-marcellus text-xl">Total:</span>
          <span className="font-josefin text-3xl font-bold text-[#5a461a]">
            R$ {totalValue.toFixed(2)}
          </span>
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
            description={`Lista de Casamento: ${cartDescription}`}
            brickIsReady={setBrickIsReady}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={handlePaymentFailure}
          />
        </div>
      </div>
    </div>
  );
};
