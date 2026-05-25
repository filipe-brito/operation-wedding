import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeftIcon, ArrowRightIcon } from "../atoms/Icons";
import { ImageFrame3 } from "../atoms/ImageFrame";
import { useEffect, useState } from "react";
import "../../styles/animations.css";

export const Carousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ active: true }, { delay: 4000 }),
  ]);

  return (
    <div className="w-full relative flex flex-col items-center">
      <button
        className="absolute top-1/2 left-0 md:bg-white rounded-full p-1 md:shadow-xl md:opacity-60 md:hover:opacity-100 md:transition md:duration-400 z-1"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ArrowLeftIcon className="w-10 h-10 text-black" />
      </button>
      <button
        className="absolute top-1/2 right-0 md:bg-white rounded-full p-1 md:shadow-xl md:opacity-60 md:hover:opacity-100 md:transition md:duration-400 z-1"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ArrowRightIcon className="w-10 h-10 text-black" />
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex items-center grow-0 shrink-0 basis-full min-w-0"
            >
              <img src={image.url} className="w-full p-1 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Carousel2 = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {/* Imagens */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          className={`
            absolute inset-0
            w-full
            h-full
            object-cover
            transition-opacity
            duration-1000
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      {/* Botão esquerda */}
      <button
        className="
          absolute top-1/2 -translate-y-1/2 left-4
          z-1
          md:bg-white/70
          rounded-full
          p-2
        "
        onClick={() =>
          setCurrent((prev) => (prev - 1 + images.length) % images.length)
        }
      >
        <ArrowLeftIcon className="w-8 h-8 text-black" />
      </button>

      {/* Botão direita */}
      <button
        className="
          absolute top-1/2 -translate-y-1/2 right-4
          z-1
          md:bg-white/70
          rounded-full
          p-2
        "
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
      >
        <ArrowRightIcon className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};
