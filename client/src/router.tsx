import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import ThematicPage from "./pages/ThematicPage/ThematicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/book-thematic/:name",
        element: <ThematicPage />,
      },
    ],
  },
]);

export default router;
