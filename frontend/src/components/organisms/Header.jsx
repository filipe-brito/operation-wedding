import { DropdownButton } from "../molecules/DropdownButton.jsx";
import {
  CancelIcon,
  CoupleIcon,
  DownArrowIcon,
  GiftIcon,
  GiftIcon2,
  HomeIcon,
  MenuIcon,
  SuccessIcon,
} from "../atoms/Icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuButton } from "../atoms/MenuButton";

const NavOptions = ({ activeMenu, setActiveMenu }) => {
  return (
    <nav
      className={`left-0 top-0 z-1 fixed h-full w-[100dvw] bg-white transition-all duration-500  ${activeMenu ? "md:translate-x-[70%] translate-x-[20%] visible" : "translate-x-full invisible"}`}
    >
      <ul className="flex flex-col w-fit p-2 text-nowrap">
        <li>
          <a
            href="/home"
            className="flex items-center gap-2 p-4"
            onClick={() => setActiveMenu(false)}
          >
            <HomeIcon className="size-8 text-[#C66E4E]" /> Página inicial
          </a>
        </li>
        <li>
          <a
            href="/rsvp"
            className="flex items-center gap-2 p-4"
            onClick={() => setActiveMenu(false)}
          >
            <SuccessIcon className="size-8 text-[#C66E4E]" />
            Confirme sua presença
          </a>
        </li>
        <li>
          <a
            href="/gifts"
            className="flex items-center gap-2 p-4"
            onClick={() => setActiveMenu(false)}
          >
            <GiftIcon2 className="size-8 text-[#C66E4E]" />
            Comprar presentes
          </a>
        </li>
      </ul>
    </nav>
  );
};

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 300) {
        setIsOnTop(true);
      } else {
        setIsOnTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <header className="z-2 fixed flex top-4 right-4">
        <MenuButton
          switcher={activeMenu}
          setSwitcher={setActiveMenu}
          isOnTop={isOnTop}
        />
      </header>
      <NavOptions activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    </>
  );
};
