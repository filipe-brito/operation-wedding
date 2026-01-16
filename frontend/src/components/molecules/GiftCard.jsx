import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export const GiftCard = ({ id, image, name, price }) => {
  const { addToCart } = useCart(); // Pegamos a função da nossa "estação"

  const handleAdd = () => {
    addToCart({ id, name, price, image });
    toast.success(`${name} adicionado ao carrinho!`, {
      style: {
        fontFamily: "JosefinSans",
        backgroundColor: "#FCFBF6",
        color: "#5a461a",
        border: "1px solid #5a461a30",
      },
    });
  };

  // Função auxiliar para formatar o preço para Real (R$)
  const formatPrice = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="w-8/10 flex flex-col group py-4 bg-white rounded-xl shadow-2xl hover:shadow-md transition-shadow duration-300 overflow-hidden border border-stone-100">
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. Informações do Presente */}
      <div className="px-5 text-center">
        <h2 className="w-full h-20 flex justify-center items-center font-marcellus text-[#5a461a] text-xl mb-2">
          {name}
        </h2>

        <p className="font-josefin text-stone-500 text-lg font-light mb-4">
          {formatPrice(price)}
        </p>

        {/* 3. Botão de Ação (Átomo de Botão) */}
        <button
          onClick={handleAdd}
          className="w-full py-2 bg-[#575b43] text-white font-josefin rounded-lg 
                     hover:bg-[#4a3a15] transition-colors duration-200 
                     text-sm uppercase tracking-widest font-medium cursor-pointer"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};
