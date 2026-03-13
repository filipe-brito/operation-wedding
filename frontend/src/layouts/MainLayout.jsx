import { Outlet } from "react-router-dom";
import { Header } from "../components/organisms/Header";
import { useState } from "react";
import CartFloatingButton from "../components/atoms/CartFloatingButton";
import CartDrawer from "../components/organisms/CartDrawer";
import { useLocation } from "react-router-dom";
import LoadingModal from "../components/atoms/LoadingModal";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation(); // Esse hook nos diz onde estamos
  // Criamos uma regra: se o caminho for "/checkout", ocultamos os elementos
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className="font-[JosefinSans] text-xs md:min-h-screen md:min-w-screen bg-[#FCFBF6]">
      <LoadingModal />
      <Header className="fixed w-full" />
      <main className="flex justify-center mt-2">
        <Outlet />
        {/* O Carrinho e o Botão ficam "vigiando" o layout inteiro */}
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
