import { useState, memo, useMemo, useCallback } from "react"; // Adicionado useState
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import axios from "axios";
import { useLoading } from "@/context/LoadingContext";

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
  locale: "pt-BR",
});

const PaymentComponent = ({
  amount,
  donorName,
  message,
  items,
  brickIsReady,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const { setIsLoading } = useLoading();

  const [fixedAmount] = useState(amount);

  const initialization = useMemo(
    () => ({
      amount: fixedAmount, // Usamos o valor que foi "congelado" na montagem
    }),
    [fixedAmount],
  );

  const customization = useMemo(
    () => ({
      paymentMethods: {
        ticket: "all",
        bankTransfer: "all",
        creditCard: "all",
        maxInstallments: 6,
      },
    }),
    [],
  ); // Nunca muda

  const onSubmit = async ({ formData }) => {
    const dataForBackend = {
      donor_name: donorName,
      donor_message: message,
      ...formData,
      gift_items: items,
    };
    const idempotencyKey = crypto.randomUUID();

    return new Promise((resolve, reject) => {
      setIsLoading(true);
      console.log("Dados enviados ao backend: ", dataForBackend);
      axios({
        url: "http://localhost:8080/api/gifts/process",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": idempotencyKey,
        },
        data: dataForBackend,
      })
        .then((response) => {
          onPaymentSuccess(response.data);
          setIsLoading(false);
          resolve();
        })
        .catch((error) => {
          onPaymentFailure(error.response?.data);
          setIsLoading(false);
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.log("Não foi possível carregar o Brick: ", error);
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
