import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TrailsWrapper from "./pages/TrailsWrapper";
import QuestionWrapper from "./pages/QuestionWrapper";
import MapWrapper from "./pages/MapWrapper";
import GameFlow from "./pages/GameFlow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "trails",
        element: <TrailsWrapper />
      },
      {
        path: "questions",
        element: <QuestionWrapper />
      },
      {
        path: "map",
        element: <MapWrapper />
      }
      // Dodaj tutaj kolejne ścieżki dla innych modułów
    ]
  },
  {
    path: "/game",
    element: <GameFlow />
  }
]);

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
