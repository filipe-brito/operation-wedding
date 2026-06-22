import { useNavigate } from "react-router-dom";
import { Button1 } from "../../../components/atoms/Button1";
import {
  CalendarIcon,
  CalendarIcon2,
  CheckIcon,
  DividerIcon,
  LocationIcon,
  Markdown,
} from "../../../components/atoms/Icons";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
export const HomeRSVPSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="rsvp"
      className="min-h-screen flex flex-col items-center text-grafite"
    >
      <div className="w-8/10 flex flex-col md:grid md:grid-cols-2 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 1.2,
          }}
          className="md:col-span-2 flex flex-col items-center"
        >
          <img
            src="/couple-celebrating.svg"
            alt="Ícone de casal celebrando"
            className="size-30"
          />
          <div className="text-center px-10 my-8">
            <h2 className="text-3xl">Capítulo 2</h2>
            <h1 className="text-4xl">A Grande Festa!</h1>
          </div>
          <p className="text-left leading-4 md:px-10">
            Depois do "sim", foram dois anos de contagem regressiva. Entre os
            malabarismos para pagar os boletos, a difícil missão de escolher os
            padrinhos e o caos de reformar a casa, finalmente encontramos o
            lugar perfeito para celebrar nosso grande dia!
          </p>
        </motion.div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-8 grid-rows-2 place-items-center my-6 mx-8">
            <span className="row-span-2 leading-none pr-4 mr-4 border-r">
              OUT <br />
              2026
            </span>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sab</span>
            <span>Dom</span>

            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
            <div className="relative flex items-center justify-center">
              <Markdown className="absolute size-8" />
              <p>18</p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/Vz3Q9n2dkwj7Xh6e8"
            className="w-9/10"
          >
            <img
              src="/rsvp-map.webp"
              alt="Mapa de localização do evento"
              className="w-full"
            />
          </a>
        </div>

        <div className="flex flex-col items-center mt-8">
          <p className="text-left leading-4">
            Domingo, 18 de outubro de 2026 -{" "}
            <span className="text-sm font-[Crimson] font-bold">
              Buffet Alpes Serrano
            </span>{" "}
            <br /> Av. Parque Petrópolis, 387
            <br />
            Serra da Cantareira, Mairiporã - SP
            <br />
            CEP: 07600-000
          </p>
          <div className="w-9/10 grid grid-cols-2 grid-rows-2 my-6">
            <img
              src="https://cdn0.casamentos.com.br/vendor/0439/3_2/960/jpg/cassa-jub-6_13_70439-166188018288401.jpeg"
              alt=""
              className="rounded-lg"
            />

            <img
              src="https://grupovillafestas.com.br/wp-content/uploads/2024/05/16.jpg"
              alt=""
              className="rounded-lg translate-y-4 -translate-x-4"
            />

            <img
              src="https://cdn0.casamentos.com.br/vendor/0439/3_2/960/jpg/cassa-jub-22_13_70439-166188021692998.jpeg"
              alt=""
              className="rounded-lg rounded-md translate-x-4"
            />

            <img
              src="https://grupovillafestas.com.br/wp-content/uploads/2024/05/P_A-1062-1.jpg"
              alt=""
              className="rounded-lg -translate-y-4 -translate-x-7"
            />
          </div>
        </div>
        <div className="md:col-span-2 w-9/10 my-6 flex flex-col gap-4">
          <p className="text-center leading-4">
            <span className="text-nowrap">
              O barman é rigoroso e sem nome na lista, não bebe!
            </span>{" "}
            <br />
            Confirme sua presença e garanta seu copo cheio!
          </p>
          <button
            onClick={() => navigate("/rsvp")}
            className="self-center rounded-full bg-deepolive flex items-center justify-center py-2 px-4 text-offwhite font-[Fiona]"
          >
            <CheckIcon className="size-4 mr-2" />
            Confirmar presença
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="relative flex flex-col items-center w-full [clip-path:polygon(0_0,100%_20%,100%_90%,0_100%)]">
          <img
            src="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto:best/v1777938739/Pr%C3%A9_Wedding_Amanda_e_Filipe-71_kxk5st.jpg"
            alt="imagem do buffet"
            className="w-full h-80 md:w-1/3  object-cover object-bottom brightness-80"
          />
          <h1 className="absolute bottom-1/3 left-10 text-6xl text-white">
            Orientações
          </h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 1.2,
          }}
          className="w-8/10"
        >
          <p className="text-center text-4xl my-4">Código de vestimenta</p>
          <div className="text-left leading-4 space-y-10 opacity-80">
            <p className="md:px-10">
              Sugerimos o uso de{" "}
              <span className="font-[Crimson] text-sm font-bold">
                traje social completo
              </span>{" "}
              para esta ocasião. Pedimos, gentilmente, que evitem a cor
              terracota e verde “musgo” reservada à paleta das madrinhas e
              padrinhos. Informamos também que o branco e seus tons claros são
              de uso exclusivo da noiva. Evite:
            </p>

            <img
              src="/dresscode-pallet.svg"
              alt="Ilustração das paletas de cores"
              className="w-2/3 md:w-1/3 mx-auto"
            />
          </div>
          <button
            onClick={() => navigate("/rsvp")}
            className="self-center rounded-full bg-deepolive flex items-center justify-center py-2 px-4 text-offwhite mx-auto my-8 font-[Fiona]"
          >
            <CheckIcon className="size-4 mr-2" />
            Mais orientações
          </button>
        </motion.div>
      </div>
    </section>
  );
};
