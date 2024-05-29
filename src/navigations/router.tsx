import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import RootLayout from "../layouts/rootLayout";
import { Path } from "./routes";
import ItemDetail from "../pages/itemDetail";
import EditItem from "../pages/editItem";

export const router = createBrowserRouter([
  {
    path: Path.Home,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: `${Path.Post}/:id`,
        element: <ItemDetail />,
      },
      {
        path: `${Path.EditPost}/:id`,
        element: <EditItem />,
      },
    ],
  },
]);
