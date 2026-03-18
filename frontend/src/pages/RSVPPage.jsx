import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { RSVPForm } from "../components/organisms/RSVPForm";

const RSVPPage = () => {
  const { setIsLoading } = useLoading();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const turnOff = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(turnOff);
  }, []);

  const content = () => {
    switch (status) {
      case "idle":
        return (
          <RSVPForm
            setIsLoading={setIsLoading}
            setStatus={setStatus}
            setErrorMessage={setErrorMessage}
          />
        );

      case "will_attend":
        return (
          <div className="flex flex-col items-center justify-center text-[#7E8C54] font-[Reboto]">
            <h1 className="text-5xl font-[GreatVibes] font-bold mb-6 text-center">
              Obrigado por confirmar presença!
            </h1>
            <p className="text-xl text-center">
              <span>Que alegria!</span>
              <br /> Recebemos sua confirmação e já estamos preparando tudo com
              muito carinho. Prepare o coração, nos vemos em breve no Buffet
              Alpes Serrano.
            </p>
          </div>
        );

      case "will_not_attend":
        return (
          <div className="flex flex-col items-center justify-center text-[#7E8C54] font-[Reboto]">
            <h1 className="text-5xl font-[GreatVibes] font-bold mb-6 text-center">
              Obrigado por confirmar!
            </h1>
            <p className="text-2xl">
              Sua presença fará falta, mas se desejar nos presentear, ficaríamos
              muito felizes!
            </p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center text-[#7E8C54] font-[Reboto]">
            <h1 className="text-5xl font-[GreatVibes] font-bold mb-6 text-center">
              Oops, algo deu errado!
            </h1>
            <p className="text-2xl text-center">{errorMessage}</p>
          </div>
        );
    }
  };

  return content();
};

export default RSVPPage;
