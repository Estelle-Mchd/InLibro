import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyBooks from "./pages/MyBooks/MyBooks";
import PublishABook from "./pages/PublishABook/PublishABook";
import ReadingPile from "./pages/ReadingPile/ReadingPile";
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
        path: "/book-thematic/:thematic",
        element: <ThematicPage />,
      },
      {
        path: "/reading-pile",
        element: <ReadingPile />,
      },
      {
        path: "/my-books",
        element: <MyBooks />,
      },
      {
        path: "/publish-a-book",
        element: <PublishABook />,
      },
    ],
  },
]);

export default router;
