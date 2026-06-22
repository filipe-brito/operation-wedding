import { useState, useEffect, useRef } from "react";
import { Button1 } from "../../components/atoms/Button1";
import {
  CalendarIcon,
  GiftIcon,
  Frame1,
  HeartIcon,
  CinemaChairIcon,
  DividerIcon2,
} from "../../components/atoms/Icons";
import { CountdownTimer } from "../../components/molecules/CountdownTimer";
import { Carousel } from "../../components/organisms/Carousel";
import { useNavigate } from "react-router-dom";
import "@/styles/general-styles.css";
import { Footer } from "../../components/organisms/Footer";
import { ImageFrame, ImageFrame3 } from "../../components/atoms/ImageFrame";
import { HomeCoupleSection } from "./sections/HomeCoupleSection";
import { HomeRSVPSection } from "./sections/HomeRSVPSection";
import { HomeGiftsSection } from "./sections/HomeGiftsSection";
import { HomeHeroSection } from "./sections/HomeHeroSection";
import { HomeAboutSection } from "./sections/HomeAboutSection";

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);

  const showNavTemporarily = () => {
    setIsVisible(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1600);
  };

  useEffect(() => {
    showNavTemporarily();

    window.addEventListener("scroll", showNavTemporarily, true);

    return () => {
      window.removeEventListener("scroll", showNavTemporarily, true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const activeSection = useActiveSection(["hero", "about", "rsvp", "gifts"]);

  return (
    <div className="w-full flex flex-col items-center overflow-hidden text-grafite bg-[url('/flowers-bg.webp')]">
      <HomeHeroSection />

      <HomeAboutSection />
      <HomeCoupleSection />
      <HomeRSVPSection />
      <HomeGiftsSection />

      <div className="w-full md:w-8/10 px-12 flex flex-col my-8 leading-4">
        <h1 className="text-3xl text-center my-8">Agradecimentos</h1>

        <p className="md:px-10">
          Obrigado por fazer parte da nossa história! Sua presença, carinho e
          generosidade tornam este momento ainda mais especial. Somos muito
          gratos por compartilhar esse dia e o início dessa nova etapa ao seu
          lado.
        </p>

        <p className="text-left text-2xl font-[Tangerine] my-8">
          Amanda e Filipe
        </p>
        <div className="w-full flex justify-end">
          <img
            src="/god-signature-logo.webp"
            alt="Assinatura de Deus"
            className="w-40 -rotate-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.6] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
