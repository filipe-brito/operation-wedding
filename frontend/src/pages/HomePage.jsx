import { useState, useEffect, useRef } from "react";
import { Button1 } from "../components/atoms/Button1";
import {
  CalendarIcon,
  GiftIcon,
  Frame1,
  HeartIcon,
  CinemaChairIcon,
} from "../components/atoms/Icons";
import { CountdownTimer } from "../components/molecules/CountdownTimer";
import { Carousel } from "../components/organisms/Carousel";
import { useNavigate } from "react-router-dom";
import "@/styles/general-styles.css";
import { Footer } from "../components/organisms/Footer";
import { ImageFrame, ImageFrame3 } from "../components/atoms/ImageFrame";
import { Header2 } from "../components/organisms/Header";
import { HomeNavigation } from "../components/molecules/HomeNavigation";
import { HomeCoupleSection } from "../components/organisms/HomeCoupleSection";
import { HomePartySection } from "../components/organisms/HomePartySection";
import { HomeRSVPSection } from "../components/organisms/HomeRSVPSection";
import { HomeGiftsSection } from "../components/organisms/HomeGiftsSection";
import { HomeHeroSection } from "../components/organisms/HomeHeroSection";
import { HomeAboutSection } from "../components/organisms/HomeAboutSection";

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
    <div className="w-full flex flex-col items-center text-[#7E8C54] overflow-hidden">
      <HomeNavigation activeSection={activeSection} isVisible={isVisible} />

      <HomeHeroSection />

      <HomeAboutSection />

      <HomeCoupleSection />
      <section className="home-sections-style w-full grid grid-cols-1 place-items-center md:grid-cols-2 md:grid-rows-1">
        <HomePartySection />
      </section>
      <section
        id="rsvp"
        className="home-sections-style flex flex-col items-center"
      >
        <HomeRSVPSection />
      </section>
      <section
        id="gifts"
        className="home-sections-style bg-[#7E8C54] text-white flex flex-col items-center py-10"
      >
        <HomeGiftsSection />
      </section>
      <Footer className="snap-end" />
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
