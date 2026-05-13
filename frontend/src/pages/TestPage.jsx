import { Button1 } from "../components/atoms/Button1";
import LoadingModal from "../components/atoms/LoadingModal";
import { Carousel2 } from "../components/organisms/Carousel";
import { Header2 } from "../components/organisms/Header";

const TestPage = () => {
  const coupleImages = [
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_1_qekqwa.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_2_w1dpde.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_3_afyz98.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961577/image_4_p9prlk.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_5_tlezdf.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image_6_i0texv.jpg",
    },
    {
      url: "https://res.cloudinary.com/dnqhyvodt/image/upload/v1774961576/image-7_brjwdo.jpg",
    },
  ];
  return (
    <>
      <div className="text-2xl font-bold mb-6 gap-4">
        <h1 className="text-4xl mb-4">CATÁLOGO DE FONTES</h1>
        <div className="font-[JosefinSans]">
          <h2>JosefinSans</h2>
          <p>Texto digitado em JosefinSans</p>
        </div>
        <div className="font-[GreatVibes]">
          <h2>GreatVibes</h2>
          <p>Texto digitado em GreatVibes</p>
        </div>
        <div className="font-[MarcellusSC]">
          <h2>MarcellusSC</h2>
          <p>Texto digitado em MarcellusSC</p>
        </div>
        <div className="font-[EmilysCandy]">
          <h2>EmilysCandy</h2>
          <p>Texto digitado em EmilysCandy</p>
        </div>
        <div className="font-[Oswald] font-normal">
          <h2>Oswald</h2>
          <p>Texto digitado em Oswald</p>
        </div>
        <div className="font-[Reboto] font-normal">
          <h2>Rebolto</h2>
          <p>Texto digitado em Rebolto</p>
        </div>
        <div className="font-[Qwitcher] font-normal">
          <h2>Qwitcher</h2>
          <p>Texto digitado em Qwitcher</p>
        </div>
        <div className="font-[Cinzel] font-normal">
          <h2>Cinzel</h2>
          <p>Texto digitado em Cinzel</p>
        </div>
        <div className="font-[Macondo] font-normal">
          <h2>MacOndo</h2>
          <p>Texto digitado em Macondo</p>
        </div>
        <div className="font-[Metamorphous] font-normal">
          <h2>Metamorphous</h2>
          <p>Texto digitado em Metamorphous</p>
        </div>
        <div className="font-[Tangerine]">
          <h2>Tangerine</h2>
          <p>Texto digitado em Tangerine</p>
        </div>
        <section className="w-[100dvw] h-[90dvh] md:h-[85dvh] flex flex-col items-center justify-center"></section>
      </div>
    </>
  );
};

export default TestPage;
