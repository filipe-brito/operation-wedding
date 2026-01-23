import { useCart } from "../context/CartContext";
import { useState } from "react";
import { ProcessPayment } from "../components/organisms/ProcessPayment";
import { PaymentConclusion } from "../components/organisms/PaymentConclusion";
import { FailureIcon } from "../components/atoms/Icons";

const CheckoutPage = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex my-10">
        <h2 className="font-marcellus text-2xl text-[#5a461a]">
          Seu carrinho está vazio. Escolha um presente primeiro! 😉
        </h2>
      </div>
    );
  }

  const handlePaymentSuccess = (paymentData) => {
    setPaymentReturn(paymentData);
    console.log("Teste: ", paymentData);
    setPaymentStatus("success");
  };

  const handlePaymentFailure = (paymentData) => {
    setPaymentReturn(paymentData);
    console.log("Teste de erro: ", paymentData);
    setPaymentStatus("failure");
  };

  const [paymentStatus, setPaymentStatus] = useState("pending"); // "pending", "success", "failure" e loading
  const [paymentReturn, setPaymentReturn] = useState(null);

  const activeStyle =
    "whitespace-nowrap flex items-center justify-center w-54 p-2 text-stone-100 bg-[#575b43] border-none";
  const inactiveStyle =
    "whitespace-nowrap flex items-center justify-center w-54 p-2 text-[#5a461a] bg-transparent border border-[#575b43]";

  let paymentProcessPainel;

  switch (paymentStatus) {
    case "pending":
      paymentProcessPainel = (
        <ProcessPayment
          handlePaymentSuccess={handlePaymentSuccess}
          handlePaymentFailure={handlePaymentFailure}
        />
      );
      break;
    case "success":
      paymentProcessPainel = <PaymentConclusion paymentData={paymentReturn} />;
      break;

    case "failure":
      paymentProcessPainel = (
        <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-sm text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <FailureIcon className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-3xl mb-4">
            Ocorreu um erro no processamento do pagamento.
          </h2>
          <p className="font-josefin text-stone-600 mb-6">
            {paymentReturn.friendlyMessage}
          </p>
          <button
            onClick={() => setPaymentStatus("pending")} // Volta para o Brick
            className="px-8 py-2 bg-[#575b43] text-white rounded-lg hover:bg-[#454936] transition-colors cursor-pointer"
          >
            Tentar novamente com outro meio de pagamento
          </button>
        </div>
      );
      break;
  }

  return (
    <div className="p-4">
      <div className="flex w-full gap-4 items-center justify-center text-[#5a461a] mb-8">
        <div
          className={`${
            paymentStatus === "pending" ? activeStyle : inactiveStyle
          }`}
        >
          1. Processar presentes
        </div>
        <div
          className={`${
            paymentStatus === "success" ? activeStyle : inactiveStyle
          }`}
        >
          2. Resumo do pagamento
        </div>
      </div>

      <div>{paymentProcessPainel}</div>
    </div>
  );
};

export default CheckoutPage;
