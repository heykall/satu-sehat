import React from 'react';

const workers = [
  { id: 1, name: 'Worker 1', status: 'Active' },
  { id: 2, name: 'Worker 2', status: 'Inactive' },
  { id: 3, name: 'Worker 3', status: 'Active' },
  // Add more worker objects as needed
];

const WorkerList = () => {
  return (
    <>
        <h1 className='mb-4 text-xl'>List of Workers</h1>
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
    <div className="flex flex-wrap justify-center">
      {workers.map((worker) => (
        <div
          key={worker.id}
          className={
            worker.status === 'Active'
              ? 'bg-teal-400 shadow-md p-4 m-4 w-80 rounded-lg text-white relative'
              : 'bg-gray-400 shadow-md p-4 m-4 w-80 rounded-lg text-white relative'
          }
        >
          {worker.status === 'Active' && (
            <div className="absolute top-2 left-2 w-4 h-4 bg-lime-400 rounded-full"></div>
          )}
          {worker.status === 'Inactive' && (
            <div className="absolute top-2 left-2 w-4 h-4 bg-red-400 rounded-full"></div>
          )}
          <h3 className="text-lg font-semibold">{worker.name}</h3>
          <p className="text-sm">{worker.status}</p>
        </div>
      ))}
    </div>
    </>
  )
};

export default WorkerList;