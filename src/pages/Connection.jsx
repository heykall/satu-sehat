import React, {useState} from 'react';
import Loading from '../components/Loading';

const ConnectForm = () => {
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
  };


  if (loading) {
    return (
      <Loading/>
    )
  } else {

    return (
      <div className="flex flex-col items-center max-w-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Connect to Database</h1>
        <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Healthcare Service Name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        <input
            type="text"
            placeholder="Database Name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            placeholder="Host"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            placeholder="Port"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            placeholder="Password"
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
  }
};

export default ConnectForm;