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
      className="fixed p-2 bottom-8 right-8 z-50 cursor-pointer animate-bounce rounded-full bg-[#575b43]"
    >
      <p className="absolute flex items-center justify-center w-5 h-5 right-1 text-[#FCFBF6] rounded-full bg-red-500">
        {cart.length}
      </p>
      <ShoppingCartIcon className="text-[#FCFBF6] h-10 w-10" />
    </div>
  );
};

export default CartFloatingButton;
