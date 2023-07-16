import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import UseApiCall from '../utils/UseApiCall';
import { useNavigate } from 'react-router-dom';

const DataIntegration = () => {
  const navigate = useNavigate();
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [errors, setErrors] = useState({});
  
  const [fields, setFields] = useState({
    environment: '',
    client_id: '',
    client_secret: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData(
      import.meta.env.VITE_BASE_URL + "/satu-sehat?healthcare_id=" + localStorage.getItem('id'),
      "get",
      null,
      {
          access_token: JSON.parse(localStorage.getItem('user-token'))
      }
    ).then(({data}) => {
      // setHealthService(data)
      navigate('/dashboard-worker/' + localStorage.getItem('id'))
    })
    .catch((e) => {
      console.log(e)
    })
  };

  const validateForm = () => {
    const errors = {};

    // Validate healthcareServiceName
    if (!fields.service_name) {
      errors.service_name = 'Healthcare Service Name is required';
    }

    if (!fields.service_name) {
      errors.service_name = 'Healthcare Service Name is required';
    }

    return errors;
  };

  useEffect(() => {
    console.log(fields);
  }, [data, error, isLoading, fields]);

  if (isLoading) {
    return <Loading message={'Creating worker..'} />;
  } else {
    return (
      <>
        <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-gray-500 text-sm text-white px-2 py-1">Logout</button>
        </div>
        {error && (
          <div
            id="toast-danger"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">Failed connect to database.</div>
          </div>
        )}
        <div className="flex flex-col items-center max-w-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Data integration settings</h1>
          <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
          <div className="relative w-80">
              <select
                name="environment"
                value={fields.environment}
                onChange={handleInputChange}
                className="px-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select Environtment</option>
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
            <input
              type="text"
              name="client_id"
              value={fields.client_id}
              placeholder="Client Key"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.service_name ? 'border-red-500' : ''
              }`}
            />
            {errors.service_name && (
              <p className="text-red-500 text-sm">{errors.service_name}</p>
            )}

            <input
              type="text"
              name="client_secret"
              value={fields.client_secret}
              placeholder="Secret Key"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.service_name ? 'border-red-500' : ''
              }`}
            />
            {errors.service_name && (
              <p className="text-red-500 text-sm">{errors.service_name}</p>
            )}
            
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Save
            </button>
          </form>
          {/* <button className="flex flex-col items-center space-y-4 w-80 mt-10 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
            Turn Off Worker
          </button> */}
        </div>
      </>
    );
  }
};

export default DataIntegration;
