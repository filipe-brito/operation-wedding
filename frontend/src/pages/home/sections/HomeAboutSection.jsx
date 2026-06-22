import { motion } from "framer-motion";
import { ImageFrame3 } from "../../../components/atoms/ImageFrame";
import { DividerIcon } from "../../../components/atoms/Icons";
import { CountdownTimer } from "../components/CountdownTimer";

export const HomeAboutSection = () => {
  return (
    <section
      id="about"
      className="w-full md:w-8/10 h-[90vh] md:h-screen flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.2,
        }}
        className="flex flex-col items-center text-justify px-2"
      >
        <h1 className="text-3xl text-center">Boas vindas!</h1>

        <p className="indent-4 px-10 mt-4 mb-10 text-justify leading-4">
          A nossa história começou entre encontros, risadas e coincidências
          improváveis no meio do trabalho hihihi. Em cada capítulo, pessoas e
          momentos que fizeram tudo valer a pena. Agora, vamos escrever o
          capítulo mais especial das nossas vidas — e é uma alegria imensa
          compartilhá-lo com vocês.
        </p>
        <div className="w-full flex items-center justify-center">
          <a href="#couple" className="w-1/4 flex flex-col items-center">
            <img
              src="/couple-idle-logo.svg"
              alt="mascote dos noivos"
              className="size-12"
            />
            <p className="scale-80">Os Noivos</p>
          </a>
          <a href="#rsvp" className="w-1/4 flex flex-col items-center">
            <img
              src="/couple-celebrating.svg"
              alt="mascote dos noivos"
              className="size-12"
            />
            <p className="text-xs">A grande festa!</p>
          </a>
          <a href="#gifts" className="w-1/4 flex flex-col items-center">
            <img
              src="/couple-travelling.svg"
              alt="mascote dos noivos"
              className="size-12 scale-120"
            />
            <p>Presentes</p>
          </a>
        </div>
        <CountdownTimer />
      </motion.div>
    </section>
  );
};
