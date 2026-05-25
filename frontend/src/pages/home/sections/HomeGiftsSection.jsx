import { useNavigate } from "react-router-dom";
import { Button1 } from "../../../components/atoms/Button1";
import { GiftIcon } from "../../../components/atoms/Icons";
export const HomeGiftsSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="gifts"
      className="w-full md:w-8/10 font-[CrimsonText] text-lg text-[#3A3A3A] flex flex-col md:grid md:grid-cols-2 items-center py-10"
    >
      <div>
        <img
          src="/couple-travelling.svg"
          alt="Ícone de casal celebrando"
          className="size-45 float-left"
        />
        <div className="text-left font-[Cinzel] font-bold">
          <h2 className="text-2xl">Capítulo 3</h2>
          <h1 className="text-2xl">
            Perdidos em <br />
            Jericoacoara
          </h1>
        </div>
        <p className="text-left px-10">
          <span className="text-5xl font-bold ">C</span>asar é lindo, mas o
          orçamento da lua de mel em Jericoacoara está mais apertado que o terno
          do noivo! Para não terminarmos "Perdidos (e falidos) em Jeri", abrimos
          cotas de patrocínio oficial. Clique abaixo, invista na nossa
          felicidade (e sanidade mental) e ajude a realizar esse sonho.
          Prometemos postar fotos bonitas para provar que o dinheiro foi bem
          gasto!
        </p>
      </div>
      <Button1
        onClick={() => navigate("/gifts")}
        className="w-80 my-10"
        label={
          <>
            <GiftIcon className="text-[#e2725b] size-30" />
            COMPRAR PRESENTE PARA OS NOIVOS
          </>
        }
      />
    </section>
  );
};
