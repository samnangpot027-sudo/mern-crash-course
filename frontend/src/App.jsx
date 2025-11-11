import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/Create";
import LayoutPage from "./layout/LayoutPage";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
