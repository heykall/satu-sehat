import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import UseApiCall from '../utils/UseApiCall';
import { useNavigate } from 'react-router-dom';


const Cdc = () => {
  const navigate = useNavigate()
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [errors, setErrors] = useState({});
  
  const [fields, setFields] = useState({
    service_name: '',
    db_name: '',
    host: '',
    port: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // handle submit cdc
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate healthcareServiceName
    if (!fields.service_name) {
      errors.healthcareServiceName = 'Healthcare Service Name is required';
    }

    return errors;
  };

  useEffect(()=> {
    // console.log(data);
  }, [data, error, isLoading])

  if (isLoading) {
    return <Loading message={'Connecting to Database...'}/>;
  } else {
    return (
      <>
      <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Database Puskesmas Kalibata</button>
        </div>
        {error && (
          <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Error icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">Failed connect to database.</div>
      </div>
        )}
        <div className="flex flex-col items-center max-w-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">CDC Settings</h1>
          <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
            <input
              type="text"
              name="service_name"
              value={fields.service_name}
              placeholder="Worker Name"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.healthcareServiceName ? 'border-red-500' : ''
              }`}
            />
            {errors.healthcareServiceName && (
              <p className="text-red-500 text-sm">{errors.healthcareServiceName}</p>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Save
            </button>
          </form>
          <button
              className="flex flex-col items-center space-y-4 w-80 mt-10 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Turn Off Worker
            </button>
        </div>
      </>
    );
  }
};

export default Cdc;

