import { HeartIcon, MainLogoIcon } from "../atoms/Icons";

export const Footer = () => {
  return (
    <footer className="flex font-[JosefinSans] text-white text-sm font-normal w-full justify-center items-center bg-deepolive border-t border-[#C2B289]/30">
      <div className="flex items-center mx-auto w-full h-[20dvh]">
        <div className="flex flex-col items-center w-full">
          <h2 className="flex text-lg tracking-widest">
            Amanda & Filipe ❤ 2026
          </h2>
          <h3 className="text-xs font-light">
            © 2026 | Desenvolvido por{" "}
            <span className="font-bold">Filipe Brito.</span>
          </h3>
        </div>
      </div>
    </footer>
  );
};
