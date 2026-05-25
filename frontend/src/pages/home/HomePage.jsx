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
import { HomeNavigation } from "./components/HomeNavigation";
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
    <div className="w-full flex flex-col items-center overflow-hidden">
      <HomeNavigation activeSection={activeSection} isVisible={isVisible} />

      <HomeHeroSection />

      <HomeAboutSection />

      <DividerIcon2 className="w-full text-[#3A3A3A] my-10" />

      <HomeCoupleSection />

      <DividerIcon2 className="w-full text-[#3A3A3A] my-10" />

      <HomeRSVPSection />

      <DividerIcon2 className="w-full text-[#3A3A3A] my-10" />

      <HomeGiftsSection />
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
