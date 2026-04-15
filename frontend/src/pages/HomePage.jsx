import { Button1 } from "../components/atoms/Button1";
import {
  SectionDividerIcon,
  CalendarIcon,
  GiftIcon,
} from "../components/atoms/Icons";
import { CountdownTimer } from "../components/molecules/CountdownTimer";
import { Carousel } from "../components/organisms/Carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook para navegação

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
    <div className="w-full relative flex flex-col items-center text-[#7E8C54]">
      <section className="h-[90dvh] md:h-[85dvh] flex flex-col items-center justify-center text-3xl w-full gap-4 bg-blend-overlay bg-white/30 bg-[url('/home_background_new.png')] bg-no-repeat bg-center bg-cover">
        <img src="/home_logo.svg" alt="Logo dos noivos" className="size-full" />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="w-full flex flex-col items-center mb-10 px-6">
        <h2 className="font-[MarcellusSC] text-5xl text-center mb-6 text-[#7E8C54]">
          Contagem Regressiva para o Grande Dia
        </h2>
        <CountdownTimer />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="bg-blend-overlay bg-white/30 bg-[url('/carousel_background.png')] bg-no-repeat bg-center bg-cover py-6">
        <h2 className="text-shadow-2xs font-[Qwitcher] text-8xl text-center text-black">
          Os Noivos
        </h2>
        <Carousel images={coupleImages} />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="bg-blend-overlay bg-white/30 bg-[url('/carousel_background.png')] bg-no-repeat bg-center bg-cover py-6">
        <h2 className="text-shadow-2xs font-[Qwitcher] text-8xl text-center text-black">
          Os Padrinhos
        </h2>
        <Carousel images={weddingPartyImages} />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className="text-white flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center bg-[#7E8C54] mb-10 py-10">
          <h2 className="text-4xl text-center mb-10">
            A gente se ama, o lugar é bonito e as bedidas estarão no ponto. Só
            falta você dizer que vem para a gente colocar seu nome na lista do
            maior evento do século!
          </h2>
          <Button1
            onClick={() => navigate("/rsvp")}
            className="w-80"
            label={
              <>
                <CalendarIcon className="text-[#e2725b] scale-300" />
                CONFIRME SUA PRESENÇA
              </>
            }
          />
        </div>
        <img src="/couple-celebrating.svg" alt="" className="size-60" />
      </section>
      <SectionDividerIcon className="w-40 my-20 opacity-70" />
      <section className=" w-full bg-[#7E8C54] text-white flex flex-col items-center mb-10 py-10">
        <h2 className="text-4xl text-center mb-10">
          Faça parte da nossa história e confirme sua presença no maior evento
          do século!
        </h2>
        <Button1
          onClick={() => navigate("/gifts")}
          className="w-80"
          label={
            <>
              <GiftIcon className="text-[#e2725b] size-40" />
              COMPRAR PRESENTE PARA OS NOIVOS
            </>
          }
        />
      </section>
    </div>
  );
};

export default Home;
