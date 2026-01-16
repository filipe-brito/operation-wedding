import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import MessagesPage from "../pages/MessagesPage";
import GiftsPage from "../pages/GiftsPage";
import CheckoutPage from "../pages/CheckoutPage";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  // AppRouter é uma arrow function
  return (
    // A função retorna um conjunto de rotas
    <Router>
      {/* Organiza o roteador (que define rotas na aplicação). É importado do react-router-dom */}
      <Routes>
        {/* Agrupamento de rotas que vamos definir */}
        <Route element={<MainLayout />}>
          {/* Definindo a rota "/home" que aponta para o componente DashboardPage */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          {/* Outras rotas desse layout */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/gifts" element={<GiftsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter; // Exporta o componente AppRouter para ser utilizado em outros arquivos
