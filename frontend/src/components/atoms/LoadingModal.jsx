import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import "./LoadingModal.css";

const LoadingModal = () => {
  // 1. Buscamos o estado lá do contexto
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {/* 2. A condição DEVE estar dentro do AnimatePresence */}
      {isLoading && (
        <motion.div
          // Estado inicial (invisível)
          initial={{ opacity: 0 }}
          // Estado quando aparece (vísivel)
          animate={{ opacity: 1 }}
          // Estado quando o React tenta removê-lo (fade out)
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col fixed inset-0 z-60 bg-[#FCFBF6] justify-center items-center w-full h-full"
        >
          <img src="/logo-animated.svg" alt="Logo dos noivos animada" />

          <h2 className="text-2xl text-center font-[Oswald]">
            Calma! Os noivos estão se decidindo quais fotos mostrar.
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingModal;
