import AppRouter from "./routes/AppRouter.jsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

function App() {
  return (
    <LoadingProvider>
        <CartProvider>
          <Toaster />
          <AppRouter />
        </CartProvider>
    </LoadingProvider>
  );
}

export default App;
