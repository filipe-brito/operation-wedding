import { useEffect, useState } from "react";

// Defina a data e hora do casamento
const TARGET_DATE = new Date("2026-10-18T16:00:00").getTime();

export const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      // Cálculo do tempo restante
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
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
    return () => clearInterval(interval);
  }, []); //O array de dependências vazio garante que o efeito só rode na montagem

  return (
    <div className="text-center text-[#5a461a] p-8">
      <div className="flex justify-center">
        {/* Bloco de Dias */}
        <div className="p-4 shadow-xl rounded-lg">
          <h2 className="text-5xl font-bold">{timeRemaining.days}</h2>
          <h3 className="text-sm">DIAS</h3>
        </div>

        {/* Bloco de Horas */}
        <div className="p-4 shadow-xl rounded-lg">
          <h2 className="text-5xl">
            {timeRemaining.hours.toString().padStart(2, "0")}{" "}
            {/* Garante 0 à esquerda */}
          </h2>
          <h3 className="text-sm">HORAS</h3>
        </div>

        {/* Bloco de Minutos */}
        <div className="p-4 shadow-xl rounded-lg">
          <h2 className="text-5xl">
            {timeRemaining.minutes.toString().padStart(2, "0")}
          </h2>
          <h3 className="text-sm">MINUTOS</h3>
        </div>

        {/* Bloco de Segundos */}
        <div className="p-4 shadow-xl rounded-lg  hidden sm:block">
          {" "}
          {/* Oculta em telas muito pequenas */}
          <h2 className="text-5xl">
            {timeRemaining.seconds.toString().padStart(2, "0")}
          </h2>
          <h3 className="text-sm">SEGUNDOS</h3>
        </div>
      </div>
    </div>
  );
};
