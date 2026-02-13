import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom"; // Importe o navegador
import { AddIcon, DeleteIcon, ReduceIcon } from "../atoms/Icons";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, totalValue, removeFromCart, increaseQuantity, reduceQuantity } =
    useCart();

  const navigate = useNavigate(); // Hook para navegação
  const handleCheckout = () => {
    onClose(); // Fecha o drawer
    navigate("/checkout"); // Leva para a página onde o Mercado Pago está configurado
  };

  // Se o carrinho não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end">
      {/* Fundo escurecido (Overlay) */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Painel Lateral */}
      <div className="relative w-full max-w-md bg-[#FCFBF6] h-full shadow-2xl flex flex-col p-6 animate-slide-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-marcellus text-2xl text-[#5a461a]">
            Seus Presentes
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600"
          >
            ✕
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="font-josefin text-stone-500 text-center mt-10">
              O carrinho está vazio...
            </p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-stone-200 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-col w-full">
                  <div className="flex gap-4 w-full">
                    <h3 className="font-josefin text-[#5a461a] font-medium">
                      {item.name}
                    </h3>
                    <p className="font-josefin text-stone-500 ml-auto whitespace-nowrap">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex">
                    <div className="h-6 flex gap-4 p-2 text-[#5a461a] items-center justify-center border-1 rounded-md">
                      <button
                        className="cursor-pointer"
                        onClick={() => reduceQuantity(item)}
                      >
                        <ReduceIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => increaseQuantity(item)}
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="ml-auto text-4xl text-[#5a461a]/70 hover:text-[#5a461a] w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé do Carrinho */}
        <div className="mt-auto pt-6 border-t border-stone-200">
          <div className="flex justify-between items-center mb-6">
            <span className="font-marcellus text-lg">Total:</span>
            <span className="font-josefin text-2xl font-bold text-[#5a461a]">
              R$ {totalValue.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-[#5a461a] text-white font-josefin rounded-lg hover:bg-[#4a3a15] transition-colors disabled:bg-stone-300"
          >
            Finalizar Presente (Mercado Pago)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
