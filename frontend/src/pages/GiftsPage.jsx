import { useEffect, useState, useRef } from "react";
import { GiftCard } from "../components/molecules/GiftCard";
import { FetchGiftCatalog } from "../service/UtilsService";
import { useLoading } from "@/context/LoadingContext";

const GiftsPage = () => {
  const { setIsLoading } = useLoading();

  const [catalog, setCatalog] = useState([]);

  const imgRef = useRef();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (imgRef.current) {
            imgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFetchCatalog = async () => {
    try {
      const response = await FetchGiftCatalog();
      setCatalog(response);
      console.log("Catálogo de presentes: ", response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleFetchCatalog();
  }, []);

  return (
    <div className="flex flex-col items-center w-full mb-8">
      <div className="relative md:h-[80vh] w-full [clip-path:polygon(0_0,100%_10%,100%_90%,0%_100%)]">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto/v1777938616/Pr%C3%A9_Wedding_Amanda_e_Filipe-68_hke6eb.jpg"
          />
          <img
            ref={imgRef}
            src="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,w_300,c_limit/v1777938941/Pr%C3%A9_Wedding_Amanda_e_Filipe-66_c4q4rg.jpg"
            alt="Foto do casal"
            className="brightness-70 object-cover w-full"
          ></img>
        </picture>
        <h1 className="absolute top-1/2 left-6 md:left-1/4 text-[130px] md:text-[160px] font-[Tangerine] text-white">
          Presentes
        </h1>
      </div>

      <div className="flex flex-col items-center my-10 px-10">
        <div className="flex flex-col font-bold font-[CrimsonText] text-center">
          <h2 className="text-3xl">Patrocine o capítulo 3:</h2>
          <h1 className="text-4xl">Perdidos em Jericoacoara</h1>
        </div>
        <img
          src="/couple-travelling.svg"
          alt="Mascote dos noivos"
          className="size-50"
        />
      </div>
      <div className="w-8/10 relative grid md:grid-cols-3 grid-cols-1 gap-4 justify-items-center">
        {catalog.map((gift) => (
          <GiftCard
            key={gift.id}
            id={gift.id}
            name={gift.gift_name}
            price={gift.price}
            image={gift.image_url}
          />
        ))}
      </div>
    </div>
  );
};
export default GiftsPage;
