import { useState } from "react";
import ConnectForm from "./pages/Connection";
import TableComponent from "./pages/Table";
import WorkerList from "./pages/Worker";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectForm/>,
  },
  {
    path: "/map-database",
    element: <TableComponent/>,
  },
  {
    path: "/workers",
    element: <WorkerList/>
  }
]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
