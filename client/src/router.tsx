import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
