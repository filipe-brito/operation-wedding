import useEmblaCarousel from "embla-carousel-react"; // npm install embla-carousel-react --save
import { ArrowLeftIcon, ArrowRightIcon } from "../atoms/Icons";
import { ImageFrame3 } from "../atoms/ImageFrame";

export const Carousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const captionPositions = (caption) => {
    switch (caption) {
      case "top-left":
        return "top-10 left-6";
      case "top-right":
        return "top-10 right-6";
      case "bottom-left":
        return "bottom-10 left-6";
      case "bottom-right":
        return "bottom-10 right-6";
      default:
        return "bottom-10 left-6";
    }
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      <button
        className="absolute top-1/2 left-40 md:bg-white rounded-full p-1 md:shadow-xl md:opacity-60 md:hover:opacity-100 md:transition md:duration-400"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ArrowLeftIcon className="w-10 h-10" />
      </button>
      <button
        className="absolute top-1/2 right-40 md:bg-white rounded-full p-1 md:shadow-xl md:opacity-60 md:hover:opacity-100 md:transition md:duration-400"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ArrowRightIcon className="w-10 h-10" />
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {images.map((image, index) => (
            <div key={index} className="grow-0 shrink-0 basis-full min-w-0">
              <figure className="relative h-full md:h-[85dvh] flex justify-center items-center">
                <img
                  loading="lazy"
                  src={image.url}
                  className="object-contain md:max-h-[85dvh]"
                />
                <figcaption
                  className={`absolute md:max-w-1/2 max-w-1/3 flex flex-col bg-[#5a741a] animate-jiggle animate-duration-3000 animate-iteration-count-infinite ${captionPositions(image.caption_position)}`}
                >
                  <div className="bg-[#E2725B] text-white text-center md:px-6 md:py-2 shadow-lg translate-x-4">
                    <span className="font-bolduppercase text-sm">
                      {image.caption_title}
                    </span>
                  </div>

                  <div className="bg-[#C2B280] text-slate-900 px-4 py-1 text-xs font-semibold translate-x-8">
                    {image.caption_description}
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Carousel2 = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
            <div key={index} className="grow-0 shrink-0 basis-full min-w-0">
              <ImageFrame3
                image={image.url}
                className={`w-full p-10 ${index % 2 === 0 ? "rotate-10" : "-rotate-10"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
