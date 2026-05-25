import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { ProcessPayment } from "./components/ProcessPayment";
import { PaymentConclusion } from "../../components/organisms/PaymentConclusion";
import { FailureIcon } from "../../components/atoms/Icons";
import { GiftReview } from "./components/GiftReview";
import { Turnstile } from "@marsidev/react-turnstile";

const CheckoutPage = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex my-10">
        <h2 className="font-marcellus text-2xl text-grafite">
          Seu carrinho está vazio. Escolha um presente primeiro! 😉
        </h2>
      </div>
    );
  }

  const handlePaymentSuccess = (paymentData) => {
    setPaymentReturn(paymentData);
    setPaymentStatus("success");
  };

  const handlePaymentFailure = (paymentData) => {
    setPaymentReturn(paymentData);
    setPaymentStatus("failure");
  };

  const [paymentStatus, setPaymentStatus] = useState("review"); // "pending", "success", "failure" e loading
  const [paymentReturn, setPaymentReturn] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const activeStyle =
    "whitespace-nowrap flex items-center justify-center w-54 p-2 text-stone-100 bg-olive border-none";
  const inactiveStyle =
    "hidden md:flex whitespace-nowrap items-center justify-center w-54 p-2 text-grafite bg-transparent border border-olive";

  let paymentProcessPainel;

  switch (paymentStatus) {
    case "review":
      paymentProcessPainel = <GiftReview setPaymentStatus={setPaymentStatus} />;
      break;

    case "captcha":
      paymentProcessPainel = (
        <div className="md:w-1/3 flex flex-col items-center bg-white p-10 rounded-2xl shadow-sm text-center m-10">
          <div className="flex justify-center my-4">
            <Turnstile
              siteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}
              onSuccess={(token) => {
                console.log("A Cloudflare confirmou humanidade:", token);
                setCaptchaToken(token);
                setPaymentStatus("process");
              }}
              onError={() => {
                setCaptchaToken(null);
                setPaymentStatus("captcha");
              }}
              onExpire={() => {
                setCaptchaToken(null);
                setPaymentStatus("captcha");
              }}
            />
          </div>
        </div>
      );
      break;

    case "process":
      paymentProcessPainel = (
        <ProcessPayment
          handlePaymentSuccess={handlePaymentSuccess}
          handlePaymentFailure={handlePaymentFailure}
          captchaToken={captchaToken}
          setCaptchaToken={setCaptchaToken}
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
            {paymentReturn.message}
          </p>
          <button
            onClick={() => setPaymentStatus("captcha")}
            className="px-8 py-2 bg-olive text-white rounded-lg hover:bg-[#454936] transition-colors cursor-pointer"
          >
            Tentar novamente com outro meio de pagamento
          </button>
        </div>
      );
      break;
  }

  return (
    <div className="w-full mt-20 flex flex-col">
      <h1 className="font-marcellus text-3xl text-grafite text-center">
        Compra de presentes
      </h1>
      <div className="flex gap-4 items-center justify-center text-grafite mt-6">
        <div
          className={`${
            paymentStatus === "review" ? activeStyle : inactiveStyle
          }`}
        >
          1. Revisar presentes
        </div>
        <div
          className={`${
            paymentStatus === "process" ? activeStyle : inactiveStyle
          }`}
        >
          2. Processar pagamento
        </div>
        <div
          className={`${
            paymentStatus === "success" ? activeStyle : inactiveStyle
          }`}
        >
          3. Resumo do pagamento
        </div>
      </div>
      <div className="flex justify-center items-center my-10">
        {paymentProcessPainel}
      </div>
    </div>
  );
};

export default CheckoutPage;
