import { HeartIcon, MainLogoIcon } from "../atoms/Icons";

export const Footer = () => {
  return (
    <footer className="flex font-[JosefinSans] text-white text-sm font-normal bottom-0 w-full justify-center items-center bg-[#7E8C54] border-t border-[#C2B289]/30">
      <div className="flex items-center mx-auto w-full h-[20dvh]">
        <h1>
          <MainLogoIcon className="size-18 text-white ml-4" />
        </h1>
        <div className="flex flex-col items-center w-full">
          <h2 className="flex text-lg tracking-widest">
            Amanda & Filipe ❤ 2026
          </h2>
          <h3 className="text-xs font-light">
            © 2026 | Desenvolvido por Filipe Brito.
          </h3>
        </div>
      </div>
    </footer>
  );
};
