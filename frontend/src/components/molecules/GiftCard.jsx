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
    <div className="w-[300px] flex flex-col group pb-4 bg-white rounded-xl shadow-2xl hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          // Sempre fornecer imagens 300x300
          className="w-[300px] h-[300px] mt-[60px] object-cover brightness-75 opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full min:h-[60px] bg-olive p-4">
          <h2 className="w-full flex text-center font-bold font-[Cinzel] text-white text-2xl">
            {name}
          </h2>
        </div>
      </div>

      {/* 2. Informações do Presente */}
      <div className="px-5 text-center">
        <p className="font-[Cinzel] font-bold text-grafite text-4xl py-4">
          {formatPrice(price)}
        </p>

        {/* 3. Botão de Ação (Átomo de Botão) */}
        <button
          onClick={handleAdd}
          className="w-full p-2 bg-olive text-white font-josefin rounded-lg hover:bg-[#4a3a15] transition-colors duration-200 text-base uppercase tracking-widest cursor-pointer"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};
