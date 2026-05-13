import { Outlet } from "react-router-dom";
import { Header } from "../components/organisms/Header";
import { useState } from "react";
import CartFloatingButton from "../components/atoms/CartFloatingButton";
import CartDrawer from "../components/organisms/CartDrawer";
import { useLocation } from "react-router-dom";
import LoadingModal from "../components/atoms/LoadingModal";
import { Footer } from "../components/organisms/Footer";
import { Header2 } from "../components/organisms/Header";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation(); // Esse hook nos diz onde estamos
  // Criamos uma regra: se o caminho for "/checkout", ocultamos os elementos
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className="font-[JosefinSans] text-xs md:w-full bg-[#ede9e6]">
      <LoadingModal />
      {/*<Header />{" "}*/}
      <Header2 />
      {/* Mesmo sendo interno da div principal, ele não ocupa espaço nela, ele ocupa espaço na root.*/}
      <main className="flex justify-center">
        <Outlet />
        {!isCheckoutPage && (
          <>
            <CartFloatingButton onClick={() => setIsCartOpen(true)} />
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default MainLayout;
