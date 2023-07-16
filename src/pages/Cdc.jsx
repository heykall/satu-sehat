import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import UseApiCall from '../utils/UseApiCall';
import { useNavigate } from 'react-router-dom';

const Cdc = () => {
  const navigate = useNavigate();
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [errors, setErrors] = useState({});
  
  const [fields, setFields] = useState({
    name: '',
    schedule: '',
    is_running: false
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
    const submitField = {...fields, schedule: Number(fields.schedule)}
    fetchData(
      import.meta.env.VITE_BASE_URL + "/worker?healthcare_id=" + localStorage.getItem('id'),
      "post",
      submitField,
      {
          access_token: JSON.parse(localStorage.getItem('user-token'))
      }
    ).then(({data}) => {
      console.log(data);
      navigate('/workers/')
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

    // Validate time format (hour:minute)
    const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (fields.time === 'custom' && !pattern.test(fields.customTime)) {
      errors.time = 'Invalid time format';
    }

    return errors;
  };

  // useEffect(() => {
  //   console.log(fields);
  // }, [data, error, isLoading, fields]);

  if (isLoading) {
    return <Loading message={'Creating worker..'} />;
  } else {
    return (
      <>
        <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Database Puskesmas Kalibata</button>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a Worker</h1>
          <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={fields.name}
              placeholder="Worker Name"
              onChange={handleInputChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.service_name ? 'border-red-500' : ''
              }`}
            />
            {errors.service_name && (
              <p className="text-red-500 text-sm">{errors.service_name}</p>
            )}
            <div className="relative w-80">
              <select
                name="schedule"
                value={fields.schedule}
                onChange={handleInputChange}
                className="px-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select Time</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
                <option value="24">24:00</option>
                {/* Add more hours as needed */}
                <option value="custom">Custom Time</option>
              </select>
              {fields.time === 'custom' && (
                <div className="relative w-80">
                  <input
                    type="text"
                    name="customTime"
                    value={fields.customTime}
                    placeholder="Custom Time (hh:mm)"
                    onChange={handleInputChange}
                    className={`px-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                      errors.time ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                </div>
              )}
            </div>
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

export default Cdc;
