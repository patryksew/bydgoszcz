import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TrailsWrapper from "./pages/TrailsWrapper";
import QuestionWrapper from "./pages/QuestionWrapper";

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
        path: "question",
        element: <QuestionWrapper />
      }
      // Dodaj tutaj kolejne ścieżki dla innych modułów
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
