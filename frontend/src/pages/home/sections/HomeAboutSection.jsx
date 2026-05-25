import { motion } from "framer-motion";
import { ImageFrame3 } from "../../../components/atoms/ImageFrame";
import { DividerIcon } from "../../../components/atoms/Icons";

export const HomeAboutSection = () => {
  return (
    <section id="about" className="w-full md:w-8/10 flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.2,
        }}
        className="flex flex-col items-center gap-y-8"
      >
        <img
          src="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto/v1778632326/IMG_0047_gpvyuk.webp"
          alt="Foto do casal"
          className="w-3/5 md:w-1/4"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.2,
        }}
        className="text-3xl text-justify px-2 mt-10 text-[#3A3A3A]"
      >
        <h1 className="text-2xl font-[Cinzel] font-bold text-center">
          Bem vindos ao nosso site!
        </h1>
        <div className="w-full flex items-center justify-center">
          <DividerIcon className="w-1/2 my-4" />
        </div>

        <p className="indent-4 px-10 font-[Tangerine]">
          A nossa história começou entre encontros, risadas e coincidências
          improváveis no meio do trabalho hihihi. Em cada capítulo, pessoas e
          momentos que fizeram tudo valer a pena. Agora, vamos escrever o
          capítulo mais especial das nossas vidas — e é uma alegria imensa
          compartilhá-lo com vocês.
        </p>
        <div className="w-full flex justify-end">
          <img
            src="/god-signature-logo.webp"
            alt=""
            className="w-60 -rotate-10"
          />
        </div>
      </motion.div>
    </section>
  );
};
