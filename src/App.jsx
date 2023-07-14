import { useState } from "react";
import ConnectForm from "./pages/Connection";
import TableComponent from "./pages/Table";
import WorkerList from "./pages/Worker";
import HomePage from "./pages/HomePage";
import Cdc from "./pages/Cdc";
import CdcEdit from "./pages/CdcEdit";
import DataIntegration from "./pages/DataIntegration";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistrationForm from "./pages/Register";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    path: "/workers/:id",
    element: <CdcEdit/>
  },
  {
    path: "/database",
    element: <ConnectForm/>
  },
  {
    path: "/cdc-worker",
    element: <Cdc/>
  },
  {
    path: "/data-integration",
    element: <DataIntegration/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path:"/register",
    element: <RegistrationForm/>
  }
]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
