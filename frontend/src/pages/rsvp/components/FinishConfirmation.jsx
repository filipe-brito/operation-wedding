import { motion } from "framer-motion";
import { Button1 } from "@/components/atoms/Button1";
import { GiftIcon } from "@/components/atoms/Icons";
import { useNavigate } from "react-router-dom";

export const FinishConfirmation = ({ willAttend }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1.2,
      }}
      className="flex flex-col gap-y-8 text-lg items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-grafite">
        {willAttend ? (
          <>
            <h1 className="text-3xl text-olive font-bold mb-6 text-center">
              Obrigado por confirmar presença!
            </h1>
            <p className="text-center">
              <span>Que alegria!</span>
              <br /> Recebemos sua confirmação e já estamos preparando tudo com
              muito carinho. Prepare o coração, nos vemos em breve no Buffet
              Alpes Serrano.
            </p>
            <p className="text-center mt-6">
              Enquanto isso, patrocine o nosso capítulo{" "}
              <span className="font-bold font-italic">
                "Perdidos em Jericoacoara"
              </span>{" "}
              clicando no botão abaixo.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-olive font-bold mb-6 text-center">
              Obrigado por confirmar!
            </h1>
            <p className="text-center">
              Sua presença fará falta, mas se desejar nos presentear, ficaríamos
              muito felizes! Patrocine o nosso capítulo{" "}
              <span className="font-bold font-italic">
                "Perdidos em Jericoacoara"
              </span>{" "}
              clicando no botão abaixo.
            </p>
          </>
        )}
      </div>

      <Button1
        onClick={() => navigate("/gifts")}
        className="w-80"
        label={
          <>
            <GiftIcon className="text-[#e2725b] size-30" />
            COMPRAR PRESENTE PARA OS NOIVOS
          </>
        }
      />
    </motion.div>
  );
};
