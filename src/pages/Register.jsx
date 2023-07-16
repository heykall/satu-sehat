import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UseApiCall from "../utils/UseApiCall";
import Loading from "../components/Loading";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [accountType, setAccountType] = useState('personal');
  const [registerForm, setRegisterForm] = useState({
      username: "",
      type: accountType,
      email: "",
      password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleAccountTypeChange = (e) => {
    const { name, value } = e.target;
    setAccountType(e.target.value);
    setRegisterForm((prevFields) => ({
      ...prevFields,
      type: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    fetchData(
      import.meta.env.VITE_BASE_URL + "/register",
      "post",
      registerForm
    )
    .then(({data}) => {
      navigate('/login')
    })
    .catch((e) => {
        console.log(e);
    })

    console.log(registerForm);
  };

  useEffect(() => {
    console.log(registerForm);
  }, [registerForm, accountType]);

  if (isLoading) {
    return (
      <Loading/>
    )
  } else {
    return (
      <>
        <section className="overflow-hidden">
          <div className="flex min-h-screen overflow-hidden">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="w-full max-w-xl mx-auto lg:w-96">
                <div>
                  <h2 className="flex justify-left mt-6 text-3xl font-extrabold text-neutral-600">Register.</h2>
                </div>
  
                <div className="mt-8">
                  <div className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="mb-4">
                        <label className="flex justify-left block mb-2 font-medium">Account Type</label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className={`flex-1 rounded-l-md py-2 px-4 ${
                              accountType === 'personal' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                            onClick={() => handleAccountTypeChange({ target: { value: 'personal' } })}
                          >
                            Personal
                          </button>
                          <button
                            type="button"
                            className={`flex-1 rounded-r-md py-2 px-4 ${
                              accountType === 'association' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                            onClick={() => handleAccountTypeChange({ target: { value: 'association' } })}
                          >
                            Association
                          </button>
                        </div>
                      </div>
  
                      <div>
                          <div className="mb-4">
                            <label className="flex justify-left block mb-2 font-medium" htmlFor="username">
                              Username
                            </label>
                            <input
                              onChange={(e) => handleInputChange(e)}
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Username"
                              className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="flex justify-left block mb-2 font-medium" htmlFor="email">
                              Email
                            </label>
                            <input
                              onChange={(e) => handleInputChange(e)}
                              type="email"
                              id="email"
                              name="email"
                              autoComplete="email"
                              required
                              placeholder="Your Email"
                              className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="flex justify-left block mb-2 font-medium" htmlFor="password">
                              Password
                            </label>
                            <input
                              onChange={(e) => handleInputChange(e)}
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Your Password"
                              className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            />
                          </div>
                        </div>
  
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <Link to="/login" className="font-medium text-teal-500 hover:text-teal-400">
                            Log in instead
                          </Link>
                        </div>
                      </div>
  
                      <div>
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-500 rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default RegistrationForm;
