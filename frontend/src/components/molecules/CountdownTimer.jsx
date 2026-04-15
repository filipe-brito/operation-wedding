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

  return (
    <div className="text-center text-white p-2">
      <div className="md:flex grid grid-cols-2 justify-center gap-6">
        {/* Bloco de Dias */}
        <div className="w-30">
          <h2 className="bg-[#7E8C54] text-5xl p-4 shadow-xl rounded-lg">
            {timeRemaining.days}
          </h2>
          <h3 className="text-lg text-[#7E8C54] font-bold mt-2">DIAS</h3>
        </div>

        {/* Bloco de Horas */}
        <div className="w-30">
          <h2 className="bg-[#7E8C54] text-5xl p-4 shadow-xl rounded-lg">
            {timeRemaining.hours.toString().padStart(2, "0")}{" "}
            {/* Garante 0 à esquerda */}
          </h2>
          <h3 className="text-lg text-[#7E8C54] font-bold mt-2">HORAS</h3>
        </div>

        {/* Bloco de Minutos */}
        <div className="w-30">
          <h2 className="bg-[#7E8C54] text-5xl p-4 shadow-xl rounded-lg">
            {timeRemaining.minutes.toString().padStart(2, "0")}
          </h2>
          <h3 className="text-lg text-[#7E8C54] font-bold mt-2">MINUTOS</h3>
        </div>

        {/* Bloco de Segundos */}
        <div className="w-30 block">
          {" "}
          {/* Oculta em telas muito pequenas */}
          <h2
            key={timeRemaining.seconds}
            className="bg-[#7E8C54] text-5xl animate-expand-vertically p-4 shadow-xl rounded-lg"
          >
            {timeRemaining.seconds.toString().padStart(2, "0")}
          </h2>
          <h3 className="text-lg text-[#7E8C54] font-bold mt-2">SEGUNDOS</h3>
        </div>
      </div>
    </div>
  );
};
