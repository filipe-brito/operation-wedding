import { CoupleLogo, SectionDividerIcon } from "../components/atoms/Icons";
import { CountdownTimer } from "../components/molecules/CountdownTimer";
import { Carousel } from "../components/organisms/Carousel";

const Home = () => {
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

  const weddingPartyImages = [
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1775152385/amanda_gewdcc.jpg",
      caption_title: "Amanda",
      caption_description: "irmã do noivo",
      caption_position: "",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1775152385/giovanna_wkvjyl.jpg",
      caption_title: "Giovanna",
      caption_description: "irmã do noivo",
      caption_position: "bottom-right",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1775152385/andre_yx9jeq.jpg",
      caption_title: "André",
      caption_description: "irmão do noivo",
      caption_position: "",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1775152385/ryan_mf4yll.jpg",
      caption_title: "Ryan",
      caption_description: "Primo do noivo",
      caption_position: "bottom-right",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1775152385/vinicius_erzbsv.jpg",
      caption_title: "Vinicius",
      caption_description: "Grande amigo do noivo",
      caption_position: "",
    },
  ];

  return (
    <div className="w-full relative flex flex-col items-center text-[#7E8C54] md:mt-6 mt-10">
      <section className="flex flex-col items-center text-3xl gap-4 mb-6">
        <div className="relative flex flex-col justify-center items-center">
          <h2 className="text-shadow-2xs font-[GreatVibes] text-6xl text-center">
            Save the Date
          </h2>
          <CoupleLogo className="w-86 h-86" />
        </div>
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="w-full flex flex-col items-center mb-10 px-6">
        <h2 className="font-[GreatVibes] text-5xl text-center mb-6 text-[#7E8C54]">
          Contagem Regressiva para o Grande Dia
        </h2>
        <CountdownTimer />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="bg-[#7e8c54]/60 py-6 timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%]">
        <h2 className="text-shadow-2xs font-[GreatVibes] text-6xl text-center mb-6 text-white">
          Os Noivos
        </h2>
        <Carousel images={coupleImages} />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="bg-[#7e8c54]/60 py-6 timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%]">
        <h2 className="text-shadow-2xs font-[GreatVibes] text-6xl text-center mb-6 text-white">
          Os Padrinhos
        </h2>
        <Carousel images={weddingPartyImages} />
      </section>
    </div>
  );
};

export default Home;
