import { useNavigate } from "react-router-dom";
import { Button1 } from "../../../components/atoms/Button1";
import {
  CalendarIcon,
  CalendarIcon2,
  DividerIcon,
  LocationIcon,
} from "../../../components/atoms/Icons";
import { useRef, useEffect } from "react";

export const HomeRSVPSection = () => {
  return (
    <section
      id="rsvp"
      className="min-h-screen w-full md:w-8/10 flex flex-col items-center font-[CrimsonText] text-lg text-[#3A3A3A]"
    >
      <div className="w-full flex flex-col md:grid md:grid-cols-2 items-center mb-20">
        <div>
          <img
            src="/couple-celebrating.svg"
            alt="Ícone de casal celebrando"
            className="md:size-40 size-40 float-right"
          />
          <div className="text-left font-[Cinzel] font-bold px-10">
            <h2 className="text-2xl">Capítulo 2</h2>
            <h1 className="text-3xl">RSVP</h1>
          </div>
          <p className="text-left px-10">
            <span className="text-5xl font-bold">D</span>epois do "sim" dela,
            foram dois anos de contagem regressiva. Entre os malabarismos para
            pagar os boletos, a difícil missão de escolher os padrinhos e o caos
            de reformar a casa, finalmente encontramos o lugar perfeito para
            celebrar nosso grande dia!
          </p>
        </div>
        <div className="relative w-full [clip-path:polygon(0_20%,100%_0,100%_100%,0_90%)]">
          <img
            src="https://cdn0.casamentos.com.br/vendor/0439/3_2/1920/jpg/cassa-jub-6_13_70439-166188018288401.jpeg"
            alt="imagem do buffet"
            className="object-cover brightness-50 opacity-80"
          />
          <div className="absolute top-6 md:top-1/3 md:right-1/3 right-0 pr-6 text-white text-center flex flex-col items-center opacity-90">
            <CalendarIcon2 className="size-14" />
            <h2 className="text-2xl">Buffet Alpes Serrano</h2>

            <p>
              <time dateTime="2026-10-18">Domingo,18 de outubro de 2026</time>
            </p>
            <address>
              Av. Parque Petrópolis, 387
              <br />
              Serra da Cantareira, Mairiporã - SP
              <br />
              07600-000
            </address>
          </div>
          <a
            href="https://maps.app.goo.gl/Vz3Q9n2dkwj7Xh6e8"
            className="w-50 flex p-3 rounded-full bg-[#e2725b] text-white font-[JosefinSans] text-xl items-center mx-auto -translate-y-1/2"
          >
            <LocationIcon className="size-10" />
            <label>Ver no mapa</label>
          </a>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 mb-20">
        <div className="relative w-full [clip-path:polygon(0_0,100%_10%,100%_80%,0_100%)]">
          <img
            src="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto:best/v1779104630/bar-background_mgvtn8.webp"
            alt="imagem do buffet"
            className="object-cover brightness-50 opacity-80"
          />

          <h1 className="absolute top-1/3 p-2 text-shadow-2xs text-shadow-white left-10 font-[Cinzel] font-bold text-white text-4xl text-center">
            Confirme <br />
            sua
            <br /> presença!
          </h1>
        </div>
        <div className="w-full px-10 md:grid md:grid-rows-2 md:items-center">
          <Button1
            onClick={() => navigate("/rsvp")}
            className="ml-5 mb-5 -rotate-15 w-40 md:w-80 float-right md:float-none md:order-2"
            label={
              <>
                <CalendarIcon className="text-[#e2725b] size-10 md:size-30 scale-150 md:scale-100" />
                <span className="text-sm md:text-2xl">
                  CONFIRME SUA PRESENÇA
                </span>
              </>
            }
          />

          <p className="text-lg">
            <span className="text-5xl font-bold ">O</span> barman é rigoroso e
            sem nome na lista, não bebe! Confirme sua presença e garanta seu
            copo cheio!
          </p>
        </div>
      </div>

      <div className="bg-[#C66E4E] w-full [clip-path:polygon(0_0,100%_20%,100%_100%,0_100%)]">
        <div className="relative w-full [clip-path:polygon(0_0,100%_20%,100%_90%,0_100%)]">
          <img
            src="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto:best/v1777938739/Pr%C3%A9_Wedding_Amanda_e_Filipe-71_kxk5st.jpg"
            alt="imagem do buffet"
            className="w-full h-80 object-cover object-bottom brightness-80"
          />
          <h1 className="absolute bottom-1/3 left-10 text-5xl text-white">
            DRESSCODE
          </h1>
        </div>
        <p className="text-center text-white text-2xl font-[Cinzel] font-bold">
          Sugerimos o uso do traje: <br />
          Traje social completo.
        </p>
        <div className="text-center text-white text-xl p-14 space-y-10 opacity-80">
          <p>
            Evite o uso de cor Terracota, pois é a paleta de cor das madrinhas.
          </p>

          <p>Uso das cores brancas e tons claros é exclusivo da noiva.</p>
        </div>
      </div>
    </section>
  );
};
