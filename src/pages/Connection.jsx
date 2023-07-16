import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import UseApiCall from '../utils/UseApiCall';
import { useNavigate } from 'react-router-dom';


const ConnectForm = () => {
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
      const dataFetch = await fetchData(import.meta.env.VITE_BASE_URL + '/try-connection','post',fields)  
      if (dataFetch === 'connected to external DB') {
        fetchData(import.meta.env.VITE_BASE_URL + '/external-db?healthcare_id=' + localStorage.getItem('id'),'post',fields, {access_token : JSON.parse(localStorage.getItem('user-token'))}).then(
          ({data}) => {
            navigate('/dashboard-worker/' + localStorage.getItem('id'))
          }
        )
        .catch(e => {
          console.log(e);
        })
        // localStorage.setItem('user', JSON.stringify(dataSecondFetch))
        // navigate('map-database', { user: dataSecondFetch })
      }
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

    // Validate databaseName
    if (!fields.db_name) {
      errors.databaseName = 'Database Name is required';
    }

    // Validate host
    if (!fields.host) {
      errors.host = 'Host is required';
    }

    // Validate port
    if (!fields.port) {
      errors.port = 'Port is required';
    } else if (isNaN(fields.port)) {
      errors.port = 'Port must be a number';
    }

    // Validate username
    if (!fields.username) {
      errors.username = 'Username is required';
    }

    // Validate password
    if (!fields.password) {
      errors.password = 'Password is required';
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
        <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-gray-500 text-sm text-white px-2 py-1">Logout</button>
        </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Connect to Database</h1>
          <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
            <input
              type="text"
              name="service_name"
              value={fields.service_name}
              placeholder="Healthcare Service Name"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.healthcareServiceName ? 'border-red-500' : ''
              }`}
            />
            {errors.healthcareServiceName && (
              <p className="text-red-500 text-sm">{errors.healthcareServiceName}</p>
            )}
            <input
              type="text"
              name="db_name"
              value={fields.db_name}
              placeholder="Database Name"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.databaseName ? 'border-red-500' : ''
              }`}
            />
            {errors.databaseName && <p className="text-red-500 text-sm">{errors.databaseName}</p>}
            <input
              type="text"
              name="host"
              value={fields.host}
              placeholder="Host"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.host ? 'border-red-500' : ''
              }`}
            />
            {errors.host && <p className="text-red-500 text-sm">{errors.host}</p>}
            <input
              type="text"
              name="port"
              value={fields.port}
              placeholder="Port"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.port ? 'border-red-500' : ''
              }`}
            />
            {errors.port && <p className="text-red-500 text-sm">{errors.port}</p>}
            <input
              type="text"
              name="username"
              value={fields.username}
              placeholder="Username"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            <input
              type="password"
              name="password"
              value={fields.password}
              placeholder="Password"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Connect
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default ConnectForm;

