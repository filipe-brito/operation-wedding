import { Outlet } from "react-router-dom";
import { Header } from "../components/organisms/Header";

const MainLayout = () => {
  return (
    <div className="font-[JosefinSans] min-h-screen min-w-screen bg-[#FCFBF6]">
      <Header className="fixed w-full z-50" />
      <main className="py-[8dvh]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
