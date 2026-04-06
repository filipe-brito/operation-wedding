import { MainLogoIcon } from "../atoms/Icons";

export const Footer = () => {
  return (
    <footer className="font-[JosefinSans] text-white text-sm font-normal h-[20dvh] bottom-0 w-full justify-center items-center bg-[#7E8C54] border-t border-[#C2B289]/30 z-50">
      <div className="flex items-center mx-auto h-full h-full">
        <h1>
          <MainLogoIcon className="size-18 text-white" />
        </h1>
        <div className="flex flex-col items-center w-full">
          <h2 className="text-lg tracking-widest">Amanda & Filipe ❤ 2026</h2>
          <h3 className="text-xs font-light">
            © 2026 | Desenvolvido por Filipe Brito.
          </h3>
        </div>
      </div>
    </footer>
  );
};
