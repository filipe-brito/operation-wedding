import { useEffect, useRef } from "react";
import { RingsIcon } from "../atoms/Icons";
import { CountdownTimer } from "../molecules/CountdownTimer";
import { motion } from "framer-motion";
export const HomeHeroSection = () => {
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

  return (
    <section
      id="hero"
      className="relative w-[100vw] h-[100svh] flex flex-col items-center justify-end text-3xl overflow-hidden"
    >
      <picture className="">
        <source
          media="(min-width: 768px)"
          srcSet="https://res.cloudinary.com/dnqhyvodt/image/upload/f_auto,q_auto,dpr_auto/v1777938742/Pr%C3%A9_Wedding_Amanda_e_Filipe-27_kecidb.jpg"
        />
        <img
          ref={imgRef}
          src="https://res.cloudinary.com/dnqhyvodt/image/upload/f_webp,q_auto:best/v1777938618/Pré_Wedding_Amanda_e_Filipe-60_l5byyc.jpg"
          alt="Foto do casal"
          className="absolute size-full inset-0 -translate-y-26 scale-[1.6] md:scale-[1.2] object-cover brightness-80"
        />
      </picture>

      <div className="flex flex-col items-center mb-10  text-center text-white text-shadow-lg opacity-80">
        <div className="flex flex-col items-center">
          <h1 className="text-lg">Save The Date</h1>
          <h1 className="mt-2">Amanda & Filipe</h1>
          <RingsIcon />
          <h2 className="text-2xl">- 18.10.2026 -</h2>
        </div>

        <CountdownTimer />
      </div>
    </section>
  );
};
