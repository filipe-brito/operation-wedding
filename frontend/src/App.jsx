import AppRouter from "./routes/AppRouter.jsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <Toaster />
      <AppRouter />
    </CartProvider>
  );
}

export default App;
