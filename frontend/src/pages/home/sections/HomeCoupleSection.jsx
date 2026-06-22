import { ImageFrame2, ImageFrame3 } from "../../../components/atoms/ImageFrame";
import { Carousel } from "../../../components/organisms/Carousel";
import { motion } from "framer-motion";

export const HomeCoupleSection = () => {
  const coupleImages = [
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/o_sim_dela_qah6a7.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066339/Pr%C3%A9_Wedding_Amanda_e_Filipe-71_kxk5st_u4s4ht.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066339/Pr%C3%A9_Wedding_Amanda_e_Filipe-63_ciodo7_pj33it.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066339/Pr%C3%A9_Wedding_Amanda_e_Filipe-66_c4q4rg_uuok9m.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066339/Pr%C3%A9_Wedding_Amanda_e_Filipe-56_ehgj0k_xelmby.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/Pr%C3%A9_Wedding_Amanda_e_Filipe-46_zkblbf_t8vi3i.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/Pr%C3%A9_Wedding_Amanda_e_Filipe-54_wlpotx_ohsrah.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/Pr%C3%A9_Wedding_Amanda_e_Filipe-53_mbo6am_y2jhn6.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/Pr%C3%A9_Wedding_Amanda_e_Filipe-12_iejyp4_p9ijna.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/Pr%C3%A9_Wedding_Amanda_e_Filipe-38_zon7qy_mbvclq.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066338/Pr%C3%A9_Wedding_Amanda_e_Filipe-14_b5fkvj_atntao.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066337/Pr%C3%A9_Wedding_Amanda_e_Filipe-23_pkba0j_qfe94t.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066337/Pr%C3%A9_Wedding_Amanda_e_Filipe-1_netuqw_jszxpw.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066337/Pr%C3%A9_Wedding_Amanda_e_Filipe-37_qtwbvb_rjnws2.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066337/Pr%C3%A9_Wedding_Amanda_e_Filipe-8_uus1hd_m8rsvg.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066337/Pr%C3%A9_Wedding_Amanda_e_Filipe-5_wkkg35_kq5qc6.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto/v1782066337/Pr%C3%A9_Wedding_Amanda_e_Filipe-30_ghg1f1_pv5ot0.jpg",
    },
  ];

  return (
    <section
      id="couple"
      className="relative min-h-screen w-full md:grid md:grid-cols-2 md:items-center md:w-8/10 md:max-h-[85dvh]"
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
          src="/couple-idle-logo.svg"
          alt="Imagem do mascote dos noivos"
          className="size-30"
        />

        <div className="text-center">
          <h2 className="text-3xl mt-10">Capítulo 1</h2>
          <h1 className="text-4xl">OS NOIVOS</h1>
        </div>

        <p className="indent-4 -shadow-2xs leading-4 font-normal text-left px-10 my-4">
          Nosso começo remonta em meados de outubro de 2022, no Recanto Nossa
          Senhora de Lourdes, como colegas de trabalho. A relação profissional
          evoluiu para uma aproximação pessoal, o que fez com que "Amanda" e
          "Filipe" se tornassem os "lindinhos" de cada um hihihi. Dois anos
          depois, essa relação culminou no "sim" da lindinha.
        </p>
      </motion.div>
      <div>
        <Carousel images={coupleImages} />
      </div>
    </section>
  );
};
