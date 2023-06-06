import React, {useState} from 'react';
import Loading from '../components/Loading';
import Toast from '../components/Toast';

const ConnectForm = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    healthcareServiceName: '',
    databaseName: '',
    host: '',
    port: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate healthcareServiceName
    if (!fields.healthcareServiceName) {
      errors.healthcareServiceName = 'Healthcare Service Name is required';
    }

    // Validate databaseName
    if (!fields.databaseName) {
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

  if (loading) {
    return <Loading message={'Connecting to Database...'}/>;
  } else {
    return (
      <>
        <Toast message="Login successful!" success />
        <div className="flex flex-col items-center max-w-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Connect to Database</h1>
          <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
            <input
              type="text"
              name="healthcareServiceName"
              value={fields.healthcareServiceName}
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
              name="databaseName"
              value={fields.databaseName}
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

