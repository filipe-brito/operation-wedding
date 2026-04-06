import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Faz o scroll para o topo toda vez que o caminho da URL mudar
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
