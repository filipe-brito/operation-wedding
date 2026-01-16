import { useState, memo, useMemo, useCallback } from "react"; // Adicionado useState
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { useCart } from "../../context/CartContext"; // Importar seu hook

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
  locale: "pt-BR",
});

const PaymentComponent = ({ amount, description, brickIsReady }) => {
  const { clearCart } = useCart(); // Pegar a função de limpar
  const [paymentResult, setPaymentResult] = useState(null); // Criar o estado

  const [fixedAmount] = useState(amount);

  const initialization = useMemo(
    () => ({
      amount: fixedAmount, // Usamos o valor que foi "congelado" na montagem
    }),
    [fixedAmount]
  );

  const customization = useMemo(
    () => ({
      paymentMethods: {
        ticket: "all",
        bankTransfer: "all",
        creditCard: "all",
      },
    }),
    []
  ); // Nunca muda

  const onSubmit = async ({ formData }) => {
    const dataForBackend = {
      ...formData,
      description: description || "Presente de Casamento",
    };
    const idempotencyKey = crypto.randomUUID();

    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/api/payment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(dataForBackend),
      })
        .then((response) => response.json()) // Converter a resposta para JSON
        .then((response) => {
          setPaymentResult(response);
          console.log("Payment Response: ", paymentResult);
          clearCart(); // Limpar o carrinho após o pagamento
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };

  const onReady = useCallback(() => {
    brickIsReady(true);
  }, [brickIsReady]); // Só recria se a prop mudar

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onError={onError}
      onReady={onReady}
    />
  );
};

export default memo(PaymentComponent);
