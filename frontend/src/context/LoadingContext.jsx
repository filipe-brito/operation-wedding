import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    // O value é o que os outros componentes vão enxergar
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook personalizado para não precisar importar o useContext em todo lugar
export const useLoading = () => useContext(LoadingContext);
