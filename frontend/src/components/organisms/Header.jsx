import { DropdownButton } from "../molecules/DropdownButton.jsx";
import { CancelIcon, DownArrowIcon, MenuIcon } from "../atoms/Icons.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  const optionsPaginas = [
    {
      name: "homePage",
      value: <h2>Pagina Inicial</h2>,
      optionStyle:
        "cursor-pointer pl-4 py-2 rounded-t-md transition duration-300 hover:bg-[#7E8C54]/15",
      link: "/home",
    },
    {
      name: "messages",
      value: <h2>Mensagens</h2>,
      optionStyle:
        "cursor-pointer pl-4 py-2 transition duration-300 hover:bg-[#7E8C54]/15",
      link: "/messages",
    },
    {
      name: "supplies",
      value: <h2>Fornecedores</h2>,
      optionStyle:
        "cursor-pointer pl-4 py-2 transition duration-300 hover:bg-[#7E8C54]/15",
      link: "/supplies",
    },
  ];

  const NavOptionsDesk = () => {
    return (
      <nav className="hidden md:flex w-full px-10 h-full items-center justify-end">
        <ul className="flex gap-8 font-regular">
          <li className="flex">
            <DropdownButton
              buttonStyle="flex items-center gap-1 font-regular cursor-pointer transition duration-300"
              buttonLabel="PÁGINAS"
              icon={<DownArrowIcon className="h-4 w-4" />}
              dropdownOptions={optionsPaginas}
              dropdownStyle={
                "w-50 bg-[#FCFBF6] text-xs shadow-lg border-1 border-[#7E8C54] divide-y-1 divide-[#5a461a]/10"
              }
            />
          </li>
          <li className="flex">
            <Link to="/gifts">PRESENTES</Link>
          </li>
          <li className="flex">
            <Link to="/rsvp">CONFIRMAR PRESENÇA</Link>
          </li>
        </ul>
      </nav>
    );
  };

  const NavOptionsMobile = () => {
    return (
      <nav className="md:hidden text-[#FCFBF6] animate-fade-in-left animate-duration-normal absolute top-full min-h-screen bg-[#7E8C54] w-full p-10 h-full items-center justify-end">
        <ul className="flex flex-col gap-8 font-regular">
          <li className="flex font-bold">PÁGINAS</li>
          {optionsPaginas.map((option) => (
            <li key={option.name} className={`${option.optionStyle}`}>
              <Link to={option.link} onClick={() => setActiveMenu(false)}>
                {option.value}
              </Link>
            </li>
          ))}
          <li className="flex font-bold">
            <Link to="/gifts" onClick={() => setActiveMenu(false)}>
              PRESENTES
            </Link>
          </li>
          <li className="flex font-bold">
            <Link to="/rsvp" onClick={() => setActiveMenu(false)}>
              CONFIRMAR PRESENÇA
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <header className="h-[10dvh] md:h-[15dvh] font-[Reboto] text-[#7E8C54] text-sm tracking-widest font-normal md:h-[15dvh] top-0 w-full fixed justify-center items-center bg-[#FCFBF6] border-b border-[#5a461a]/30 z-50">
      <div className="w-8/10 flex items-center mx-auto h-full">
        <h1 className="flex items-center gap-4 font-[GreatVibes] text-2xl">
          <img
            src="/couple-main-logo.svg"
            alt="Logo Principal"
            className="md:w-50 w-30"
          />
        </h1>
        <button
          className="ml-auto md:hidden"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {activeMenu ? (
            <CancelIcon className="h-10 w-10 animate-flip-in-x animate-duration-normal" />
          ) : (
            <MenuIcon className="h-10 w-10 animate-flip-in-x animate-duration-normal" />
          )}
        </button>
        <NavOptionsDesk />
      </div>
      {activeMenu && <NavOptionsMobile />}
    </header>
  );
};
