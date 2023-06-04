import { useState } from "react";
import ConnectForm from "./pages/Connection";
import TableComponent from "./pages/Table";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  return (
    <>
      <TableComponent />
      {/* <Loading/> */}
      {/* <ConnectForm/> */}
    </>
  );
}

export default App;
