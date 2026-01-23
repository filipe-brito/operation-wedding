import { CodeBarIcon, SuccessIcon, ProcessingIcon } from "../atoms/Icons";

export const PaymentConclusion = ({ paymentData }) => {
  switch (paymentData.paymentMethodType) {
    case "bank_transfer":
      return (
        <PixPayment
          status={paymentData.status}
          qrCodeBase64={paymentData.qrCodeBase64}
          qrCode={paymentData.qrCode}
        />
      );

    case "credit_card":
      return (
        <CreditCardPayment
          status={paymentData.status}
          paymentId={paymentData.paymentId}
          paymentMethodId={paymentData.paymentMethodId}
          totalPaidAmount={paymentData.totalPaidAmount}
          message={paymentData.friendlyMessage}
        />
      );
  }
};

const PixPayment = ({ status, qrCodeBase64, qrCode }) => {
  const copiarPix = () => {
    navigator.clipboard.writeText(qrCode).then(() => {
      alert("Código Pix copiado! Cole no seu banco.");
    });
  };

  switch (status) {
    case "action_required":
      return (
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl text-[#5a461a] mb-2">Quase pronto!</h2>
          <p className="font-josefin text-stone-600 mb-6 text-center">
            Escaneie o QR Code ou copie o código para finalizar seu presente.
          </p>

          {/* Exibindo o QR Code */}
          <div className="bg-white p-4 border-2 border-stone-100 rounded-xl mb-6">
            <img
              src={`data:image/png;base64,${qrCodeBase64}`}
              alt="QR Code Pix"
              className="w-48 h-48"
            />
          </div>

          {/* 3. Botão Copia e Cola */}
          <div className="w-full space-y-3">
            <div className="relative">
              <input
                readOnly
                value={qrCode}
                className="w-full p-3 pr-24 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono truncate"
              />
              <button
                onClick={copiarPix}
                className="flex gap-2 absolute right-1 top-1 bottom-1 px-2 items-center bg-[#5a461a] text-white text-sm rounded-md hover:bg-[#453614] transition-colors cursor-pointer"
              >
                <CodeBarIcon className="w-6 h-6 text-stone-100" />
                Copiar
              </button>
            </div>
          </div>
        </div>
      );
  }
};

const CreditCardPayment = ({
  status,
  paymentId,
  paymentMethodId,
  totalPaidAmount,
  message,
}) => {
  switch (status) {
    case "processed":
      return (
        <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-sm text-center">
          {/* Um ícone de check animado ou uma imagem bonita de celebração */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <SuccessIcon />
          </div>

          <h2 className="font-marcellus text-3xl text-[#5a461a] mb-4">
            Presente Recebido!
          </h2>

          <p className="font-josefin text-stone-600 mb-8 max-w-xs">
            Muito obrigado por fazer parte da nossa história. O pagamento de
            <strong> R$ {totalPaidAmount}</strong> via{" "}
            <strong>{paymentMethodId}</strong> foi confirmado.
          </p>

          <div className="bg-stone-50 p-4 rounded-lg w-full text-sm text-stone-500 font-mono">
            Código da transação: {paymentId}
          </div>

          <button
            onClick={() => (window.location.href = "/")} // Volta para a Home
            className="mt-8 px-8 py-3 bg-[#5a461a] text-white rounded-full font-josefin hover:bg-[#453614] transition-all"
          >
            Voltar para o site
          </button>
        </div>
      );
    case "processing":
      return (
        <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-sm text-center">
          {/* Um ícone de check animado ou uma imagem bonita de celebração */}
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <ProcessingIcon className="w-12 h-12 text-amber-400" />
          </div>

          <h2 className="font-marcellus text-3xl text-[#5a461a] mb-4">
            Pagamento em processamento!
          </h2>

          <p className="font-josefin text-stone-600 mb-8 max-w-xs">{message}</p>

          <div className="bg-stone-50 p-4 rounded-lg w-full text-sm text-stone-500 font-mono">
            Código da transação: {paymentId}
          </div>

          <button
            onClick={() => (window.location.href = "/")} // Volta para a Home
            className="mt-8 px-8 py-3 bg-[#5a461a] text-white rounded-full font-josefin hover:bg-[#453614] transition-all"
          >
            Voltar para o site
          </button>
        </div>
      );
  }
};
