import { useNavigate } from "react-router-dom";
import { Button1 } from "../atoms/Button1";
import { GiftIcon } from "../atoms/Icons";
export const HomeGiftsSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-4xl text-center mb-10">
        Vamos fazer uma série de nossas vidas. Patrocine o episódio "Perdidos em
        Jericoacoara!"
      </h2>
      <Button1
        onClick={() => navigate("/gifts")}
        className="w-80"
        label={
          <>
            <GiftIcon className="text-[#e2725b] size-40" />
            COMPRAR PRESENTE PARA OS NOIVOS
          </>
        }
      />
    </>
  );
};
