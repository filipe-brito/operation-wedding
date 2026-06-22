import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeftIcon, ArrowRightIcon } from "../atoms/Icons";
import { ImageFrame3 } from "../atoms/ImageFrame";
import { useEffect, useState, useCallback } from "react";
import "../../styles/animations.css";

export const Carousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ active: true }, { delay: 4000 }),
  ]);

  const [imageActive, setImageActive] = useState(0);

  const onSelect = useCallback((emblaApi) => {
    setImageActive(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi); // Roda uma vez no início
    emblaApi.on("select", onSelect); // Roda toda vez que o slide muda
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative flex flex-col items-center">
      <button
        className="z-1 absolute top-1/2 left-5 rounded-full border bg-white p-1 shadow-xl opacity-60 md:hover:opacity-100 md:transition md:duration-400 cursor-pointer"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ArrowLeftIcon className="w-6 h-6 text-black" />
      </button>
      <button
        className="z-1 absolute top-1/2 right-5 bg-white rounded-full border shadow-xl opacity-60 md:hover:opacity-100 md:transition md:duration-400 cursor-pointer"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ArrowRightIcon className="w-6 h-6 text-black" />
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex items-center grow-0 shrink-0 basis-1/2 min-w-0 transition duration-500 scale-70 ${index === imageActive ? "opacity-100 scale-100" : "opacity-50"}`}
            >
              <img
                src={image.url}
                className="w-full p-1 object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
