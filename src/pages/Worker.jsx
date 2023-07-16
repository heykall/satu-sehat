import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseApiCall from "../utils/UseApiCall";

const WorkerList = () => {
  const navigate = useNavigate();

  // const location = useLocation()
  // const connection_id = location.state.connectionId
  // const [workers, setWorkers] = useState([
  //   { _id: 'kmzway87aa', service_name: "Test", table_name: "DB name", is_running: true },
  //   { _id: 'kmzwayaw1aa', service_name: "Test 2", table_name: "DB name 2", is_running: false },
  // ]);

  const [workers, setWorkers] = useState([]);
  const { isLoading, data, error, fetchData } = UseApiCall();

  const handleFetchWorker = async () => {
    const data = await fetchData(
      import.meta.env.VITE_BASE_URL + "/capture-workers/" + connection_id,
      "get"
    );
    setWorkers(data.data);
  };

  const handleCreateWorker = () => {
    navigate('/cdc-worker');
  };

  const handleSelectWorker = (id) => {
    navigate('/workers/'+ id);
  }

  useEffect(() => {
    if (!workers.length) {
      handleFetchWorker();
    }
    console.log(workers);
  }, [workers]);

  return (
    <>
      <h1 className="mb-4 text-xl">List of Workers</h1>
      {/* <div className="flex-col">
      {workers.map((worker) => (
        <div key={worker.id} 
        className={ worker.status === 'Active'? "bg-teal-500 shadow-md p-4 m-4 w-80 rounded-lg text-white relative" : "bg-gray-500 shadow-md p-4 m-4 w-80 rounded-lg text-white relative"}>
          {worker.status === 'Active' && (
            <div className="absolute top-2 left-2 w-4 h-4 bg-green-400 rounded-full"></div>
          )}
          {worker.status === 'Inactive' && (
            <div className="absolute top-2 left-2  w-4 h-4 bg-red-400 rounded-full"></div>
          )}
          <h3 className="text-lg font-semibold">{worker.name}</h3>
          <p className="text-sm">{worker.status}</p>
        </div>
      ))}
    </div> */}
      <div className="absolute top-0 right-0">
        <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">
          Worker A
        </button>
        <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">
          Database Puskesmas Kalibata
        </button>
      </div>
      <div className="absolute top-0 right-0 mt-12">
        <button
          className="flex flex-col m-2 bg-cyan-500 text-sm text-white px-2 py-1"
          onClick={handleCreateWorker}
        >
          Create New Worker
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {workers.length ? (
          workers.map((worker) => (
            <div
              key={worker._id}
              className={`${
                worker.is_running
                  ? "bg-teal-400 shadow-md p-4 m-4 w-80 cursor-pointer rounded-lg text-white relative hover:border-2 border-indigo-300"
                  : "bg-gray-400 shadow-md p-4 m-4 w-80 cursor-pointer rounded-lg text-white relative hover:border-2 border-red-300"
              }`}
              onClick={() => handleSelectWorker(worker._id)}
            >
              {worker.is_running === true && (
                <div className="absolute top-2 left-2 w-4 h-4 bg-lime-400 rounded-full"></div>
              )}
              {worker.is_running === false && (
                <div className="absolute top-2 left-2 w-4 h-4 bg-red-400 rounded-full"></div>
              )}
              <h3 className="text-lg font-semibold">{worker.service_name}</h3>
              <p className="text-sm">Table: {worker.table_name}</p>
            </div>
          ))
        ) : (
          <h2>No Worker Found</h2>
        )}
      </div>
    </>
  );
};

export default WorkerList;
