import { useNavigate } from "react-router-dom";
import { Button1 } from "../../../components/atoms/Button1";
import { GiftIcon } from "../../../components/atoms/Icons";
import { motion } from "framer-motion";
export const HomeGiftsSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="gifts"
      className="w-full md:w-8/10 flex flex-col  items-center py-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.2,
        }}
        className="flex flex-col items-center"
      >
        <img
          src="/couple-travelling.svg"
          alt="Ícone de casal celebrando"
          className="size-45"
        />
        <div className="text-center my-8">
          <h2 className="text-2xl">Capítulo 3</h2>
          <h1 className="text-4xl">Perdidos em Jericoacoara</h1>
        </div>
        <p className="text-left px-10 leading-4">
          Casar é lindo, mas o orçamento da lua de mel em Jericoacoara está mais
          apertado que o terno do noivo! Para não terminarmos "Perdidos (e
          falidos) em Jeri", abrimos cotas de patrocínio oficial. Clique abaixo,
          invista na nossa felicidade (e sanidade mental) e ajude a realizar
          esse sonho. Prometemos postar fotos bonitas para provar que o dinheiro
          foi bem gasto!
        </p>
      </motion.div>
      <button
        onClick={() => navigate("/gifts")}
        className="self-center rounded-full bg-deepolive flex items-center justify-center py-2 px-4 text-offwhite my-8 text-xl font-[Fiona]"
      >
        <GiftIcon className="size-4 mr-2" />
        Comprar Presentes
      </button>
    </section>
  );
};
