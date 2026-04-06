import useEmblaCarousel from "embla-carousel-react"; // npm install embla-carousel-react --save
import { ArrowLeftIcon, ArrowRightIcon } from "../atoms/Icons";

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
        className="absolute top-1/2 left-4 z-10 md:bg-white rounded-full p-1 md:shadow-xl md:opacity-60 md:hover:opacity-100 md:transition md:duration-400 md:animate-none animate-horizontal-bounce animate-iteration-count-infinite animate-duration-2000"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ArrowLeftIcon className="w-10 h-10" />
      </button>
      <button
        className="absolute top-1/2 right-4 z-10 md:bg-white rounded-full p-1 md:shadow-xl md:opacity-60 md:hover:opacity-100 md:transition md:duration-400 md:animate-none animate-horizontal-bounce animate-iteration-count-infinite animate-duration-2000"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ArrowRightIcon className="w-10 h-10" />
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {images.map((image, index) => (
            <div key={index} className="grow-0 shrink-0 basis-full min-w-0">
              <figure className="h-full md:h-[100dvh] flex justify-center items-center">
                <div className="relative">
                  <img
                    loading="lazy"
                    src={image.url}
                    className="relative object-contain md:opacity-70 md:hover:opacity-100 transition-opacity duration-300 mask-y-from-80% mask-y-to-99% md:max-h-[85dvh]"
                  />
                  <figcaption
                    className={`absolute max-w-1/2 flex flex-col bg-[#5a741a] animate-jiggle animate-duration-3000 animate-iteration-count-infinite ${captionPositions(image.caption_position)}`}
                  >
                    <div className="bg-[#E2725B] text-white text-center px-6 py-2 shadow-lg translate-x-4">
                      <span className="font-bolduppercase text-sm">
                        {image.caption_title}
                      </span>
                    </div>

                    <div className="bg-[#C2B280] text-slate-900 px-4 py-1 text-xs font-semibold translate-x-8">
                      {image.caption_description}
                    </div>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
