import { useCart } from "../../context/CartContext";
import { ShoppingCartIcon } from "./Icons";
// Destruímos a prop onClick aqui nos parênteses
const CartFloatingButton = ({ onClick }) => {
  const { cart } = useCart();

  if (cart.length === 0) return null;

  return (
    // Conectamos o onClick ao clique da div ou do botão
    <div
      onClick={onClick}
      className="fixed p-2 bottom-8 right-8 z-2 cursor-pointer animate-bounce rounded-full bg-[#575b43]"
    >
      <p className="absolute md:text-2xl flex items-center justify-center w-5 h-5 md:w-10 md:h-10 right-1 text-[#FCFBF6] rounded-full bg-red-500">
        {cart.length}
      </p>
      <ShoppingCartIcon className="text-[#FCFBF6] h-10 w-10 md:h-20 md:w-20" />
    </div>
  );
};

export default CartFloatingButton;
