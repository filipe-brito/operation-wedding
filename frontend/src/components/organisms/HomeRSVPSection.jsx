import { useNavigate } from "react-router-dom";
import { Button1 } from "../atoms/Button1";
import { CalendarIcon } from "../atoms/Icons";

export const HomeRSVPSection = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-[#354a21] text-center font-[Cinzel] text-2xl">
          A Celebração dos Reinos
        </h1>

        <p className="text-[#354a21] text-shadow-2xs font-[Metamorphous] text-sm text-center px-10 my-4">
          O roteiro nos trouxe até aqui. O pergaminho revela o local onde nossa
          união será celebrada. Siga o mapa, evite dragões e chegue enquanto as
          bebidas ainda estiverem geladas.
        </p>
      </div>
      <div className="w-full h-full grid grid-cols-2 md:flex-row place-items-center gap-y-8">
        <a
          className="col-span-2 flex flex-col w-full"
          role="button"
          tabIndex="0"
          href="https://maps.app.goo.gl/SLQ6n3wbMZEKJLxA9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <label className="text-sm text-center text-[#354a21] font-[Cinzel] font-bold">
            Clique no ícone abaixo <br />
            para abrir o maps
          </label>
          <img
            src="/map-buffet-location-icon2.svg"
            alt="Ilustração de um mapa com a localização do buffet"
            className="w-full rounded-md"
          />
        </a>

        <Button1
          onClick={() => navigate("/rsvp")}
          className="w-full"
          label={
            <>
              <CalendarIcon className="text-[#e2725b] size-10" />
              <span className="text-sm">CONFIRME SUA PRESENÇA</span>
            </>
          }
        />

        <img
          src="/couple-celebrating.svg"
          alt="Ícone de casal celebrando"
          className="md:size-40 size-40"
        />
      </div>
    </>
  );
};
