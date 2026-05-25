import {
  CoupleIcon,
  GiftIcon2,
  HomeIcon,
  SuccessIcon,
} from "../../../components/atoms/Icons";
export const HomeNavigation = ({ activeSection, isVisible }) => {
  const navLinks = [
    { id: "hero", label: <HomeIcon /> },
    { id: "about", label: <CoupleIcon /> },
    { id: "rsvp", label: <SuccessIcon /> },
    { id: "gifts", label: <GiftIcon2 className="size-8" /> },
  ];
  return (
    <nav
      className={`z-2 fixed flex flex-col items-center top-[50svh] -translate-y-[20svh] right-[5svw] gap-4 text-lg rounded-t-4xl rounded-b-4xl space-y-4 border-6 border-double border-[#451911] bg-[#761305] ${isVisible ? "transition duration-900 opacity-40 pointer-events-auto" : " transition duration-900 opacity-0 pointer-events-none"}`}
    >
      {navLinks.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`
            p-2 text-sm text-[#7E8C54] rounded-full transition duration-300 cursor-pointer
            ${
              activeSection === id
                ? "scale-180 bg-[#550f05] font-bold outline-2 outline-offset-2 outline-[#451911]"
                : "hover:text-white"
            }
          `}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
