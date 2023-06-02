import React from 'react';

const ConnectForm = () => {
  return (
    <div className="flex flex-col items-center max-w-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Connect to Database</h1>
      <form className="flex flex-col space-y-4 w-80">
        <input
          type="text"
          placeholder="Connection String"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
        >
          Connect
        </button>
      </form>
    </div>
  );
};

export default ConnectForm;