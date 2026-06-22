import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

// Defina a data e hora do casamento
const TARGET_DATE = new Date("2026-10-18T16:00:00").getTime();

export const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    const turnOff = setTimeout(() => setIsLoading(false), 2000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      // Cálculo do tempo restante
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // Se a data passou, limpa o intervalo e define tudo como 0
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Opcional: Você pode retornar uma mensagem de "O GRANDE DIA CHEGOU!"
      } else {
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Limpeza: Garante que o intervalo seja removido quando o componente for desmontado
    return () => {
      (clearTimeout(turnOff), clearInterval(interval));
    };
  }, []); //O array de dependências vazio garante que o efeito só rode na montagem

  const NumberContainer = ({ number, label }) => {
    return (
      <div className="relative w-1/4 flex flex-col items-center justify-center">
        <h2 className="text-5xl">{number}</h2>
        <h3 className="text-xs">{label}</h3>
      </div>
    );
  };

  return (
    <div className="w-9/10 text-center text-white py-4 px-16 bg-deepolive rounded-md text-5xl font-[Fiona] my-12">
      <div className="flex w-full gap-2">
        {/* Bloco de Dias */}
        <NumberContainer number={timeRemaining.days} label="DIAS" />
        <p>:</p>
        {/* Bloco de Horas */}
        <NumberContainer
          number={timeRemaining.hours.toString().padStart(2, "0")}
          label="HORAS"
        />
        <p>:</p>
        {/* Bloco de Minutos */}
        <NumberContainer
          number={timeRemaining.minutes.toString().padStart(2, "0")}
          label="MIN"
        />
        <p>:</p>
        {/* Bloco de Segundos */}
        <NumberContainer
          number={timeRemaining.seconds.toString().padStart(2, "0")}
          label="SEG"
        />
      </div>
    </div>
  );
};
