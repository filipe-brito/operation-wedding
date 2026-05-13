import { ImageFrame2, ImageFrame3 } from "../atoms/ImageFrame";
import { Carousel, Carousel2 } from "../organisms/Carousel";

export const HomeCoupleSection = () => {
  const coupleImages = [
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_1_qekqwa.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_2_w1dpde.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
      caption_position: "top-right",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_3_afyz98.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961577/image_4_p9prlk.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_5_tlezdf.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_6_i0texv.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image-7_brjwdo.jpg",
      caption_title: "OS NOIVOS DO SÉCULO",
      caption_description:
        "Amanda e Filipe, um amor que transcende o tempo e as eras.",
    },
  ];

  return (
    <section
      id="nossa-historia"
      className="relative home-sections-style md:max-h-[85dvh] w-full flex flex-col md:flex-row items-center"
    >
      <div className="flex flex-col items-center md:w-full">
        <h1 className="text-[#354a21] text-center font-[Cinzel] text-3xl">
          OS NOIVOS DO SÉCULO
        </h1>
        <p className="text-[#354a21] text-shadow-2xs font-[Metamorphous] text-sm text-center px-10 my-4">
          Uma história real. Sem dublês, apenas emoção e com um roteiro redigido
          pelo destino. Acompanhe nossa jornada até o "sim" dela.
        </p>
      </div>

      <div className="w-8/10">
        <Carousel2 images={coupleImages} />
      </div>
    </section>
  );
};
