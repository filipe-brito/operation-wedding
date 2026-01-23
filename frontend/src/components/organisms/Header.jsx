import { DropdownButton } from "../molecules/DropdownButton.jsx";
import { DownArrowIcon } from "../atoms/Icons.jsx";
import { Link } from "react-router-dom";

export const Header = () => {
  const optionsPaginas = [
    {
      name: "homePage",
      value: <h2>Pagina Incial</h2>,
      optionStyle:
        "cursor-pointer pl-4 py-2 rounded-t-md transition duration-300 hover:bg-[#5a461a]/15 text-[#5a461a]",
      link: "/home",
    },
    {
      name: "messages",
      value: <h2>Mensagens</h2>,
      optionStyle:
        "cursor-pointer pl-4 py-2 transition duration-300 hover:bg-[#5a461a]/15",
      link: "/messages",
    },
    {
      name: "supplies",
      value: <h2>Fornecedores</h2>,
      optionStyle:
        "cursor-pointer pl-4 py-2 transition duration-300 hover:bg-[#5a461a]/15",
      link: "/supplies",
    },
  ];

  return (
    <header className="h-[15dvh] top-0 w-full flex justify-center bg-[#FCFBF6] border-b border-[#5a461a]/30 z-50">
      <div className="w-8/10 flex items-center">
        <h1 className="flex items-center gap-4 font-[GreatVibes] text-2xl text-[#5a461a]">
          <span className="text-5xl">A</span>
          <span>&</span>
          <span className="text-5xl">F</span>
        </h1>
        <nav className="flex w-full px-10 h-full items-center justify-center">
          <ul className="flex gap-8 font-regular text-[#5a461a]">
            <li className="flex">
              <DropdownButton
                buttonStyle="flex items-center gap-1 font-regular cursor-pointer transition duration-300 text-[#5a461a]"
                buttonLabel="PÁGINAS"
                icon={<DownArrowIcon className="h-4 w-4" />}
                dropdownOptions={optionsPaginas}
                dropdownStyle={
                  "w-50 bg-[#FCFBF6] shadow-lg rounded-md border-1 border-[#5a461a] divide-y-1 divide-[#5a461a]/10"
                }
              />
            </li>
            <li className="flex">
              <Link to="/gifts">PRESENTES</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
