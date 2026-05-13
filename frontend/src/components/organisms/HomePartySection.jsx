import { ImageFrame3 } from "../atoms/ImageFrame";
import { Carousel } from "../organisms/Carousel";

export const HomePartySection = () => {
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
    <>
      <div className="md:order-2 flex flex-col items-center">
        <h1 className="text-[#354a21] text-center font-[Cinzel] text-2xl">
          A Sociedade do Anel <br />
          (Os padrinhos)
        </h1>

        <p className="text-[#354a21] text-shadow-2xs font-[Metamorphous] text-sm text-center px-10 my-4">
          A sociedade do anel é formada pelos companheiros mais próximos,
          incumbidos de acompanhar os noivos nessa jornada que se inicia.
        </p>
      </div>
      <ImageFrame3
        image={<Carousel images={weddingPartyImages} />}
        className="md:order-1 md:w-full w-2/3"
      />
    </>
  );
};
