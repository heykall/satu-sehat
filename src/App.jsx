import { useState } from "react";
import ConnectForm from "./pages/Connection";
import TableComponent from "./pages/Table";
import WorkerList from "./pages/Worker";
import HomePage from "./pages/HomePage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/map-database",
    element: <TableComponent/>,
  },
  {
    path: "/workers",
    element: <WorkerList/>
  },
  {
    path: "/database",
    element: <ConnectForm/>
  }
]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
