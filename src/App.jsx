import { useState } from "react";
import ConnectForm from "./pages/Connection";
import TableComponent from "./pages/Table";
import Loading from "./components/Loading";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
