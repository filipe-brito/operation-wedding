import { ImageFrame2, ImageFrame3 } from "../../../components/atoms/ImageFrame";
import { Carousel2 } from "../../../components/organisms/Carousel";
import { motion } from "framer-motion";

export const HomeCoupleSection = () => {
  const coupleImages = [
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961576/image_1_qekqwa.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961576/image_2_w1dpde.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961576/image_3_afyz98.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961577/image_4_p9prlk.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961576/image_5_tlezdf.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961576/image_6_i0texv.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,g_faces/v1774961576/image-7_brjwdo.jpg",
    },
  ];

  return (
    <section
      id="couple"
      className="relative min-h-screen w-full md:grid md:grid-cols-2 md:items-center md:w-8/10 md:max-h-[85dvh] text-[#3A3A3A] text-lg font-[CrimsonText]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.2,
        }}
        className="relative w-full [clip-path:polygon(0_0,100%_15%,100%_90%,0_100%)]"
      >
        <div className="brightness-80 h-[30vh] md:h-[70vh]">
          <Carousel2 images={coupleImages} />
        </div>
      </motion.div>
      <div className="">
        <img
          src="/couple-idle-logo.svg"
          alt="Imagem do mascote dos noivos"
          className="float-left size-40"
        />

        <div className="font-[Cinzel] font-bold">
          <h2 className="text-2xl mt-10">Capítulo 1</h2>
          <h1 className="text-3xl">OS NOIVOS</h1>
        </div>

        <p className="-shadow-2xs font-normal text-left px-10 my-4">
          <span className="text-5xl font-bold">N</span>osso começo remonta à
          meados de outubro de 2022, no Recanto Nossa Senhora de Lourdes, ela
          gerente e ele orientador em outro serviço. A relação profissional
          evoluiu para uma aproximação pessoal, o que os levou a querer fazer
          horas extras no serviço sem motivo nenhum hihihi. Dois anos depois,
          essa relação culminou no "sim" dela.
        </p>
      </div>
    </section>
  );
};
