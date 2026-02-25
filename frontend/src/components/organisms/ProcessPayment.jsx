import { useState } from "react";
import { useCart } from "../../context/CartContext";
import PaymentComponent from "./PaymentForm";
import { LoadingIcon } from "../atoms/Icons";

export const ProcessPayment = ({
  handlePaymentSuccess,
  handlePaymentFailure,
}) => {
  const { cart, totalValue, donorName, message } = useCart();

  const [brickIsReady, setBrickIsReady] = useState(false);

  return (
    <div className="w-full flex justify-center">
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
          <h2 className="font-marcellus text-xl mb-4 text-center">
            Pagamento Seguro
          </h2>
          <PaymentComponent
            amount={totalValue}
            donorName={donorName}
            message={message}
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
