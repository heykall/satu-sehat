import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UseApiCall from "../utils/UseApiCall";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const CreateHealthService = () => {
  const navigate = useNavigate();
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [healthService, setHealthService] = useState({
    healthcare_name: "",
    alias: "",
    type: "",
    location: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHealthService((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData(
        import.meta.env.VITE_BASE_URL + "/healthcare",
        "post",
        healthService,
        {
            access_token: JSON.parse(localStorage.getItem('user-token'))
        }
      ).then(({data}) => {
        console.log(data);
        navigate('/medical-services/')
      })
      .catch((e) => {
        console.log(e)
      })
    
    console.log(healthService);
  };

  useEffect(() => {
    // console.log(credential);
  }, [healthService]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className=" overflow-hidden">
          <div className="flex min- overflow-hidden">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="w-full max-w-xl mx-auto lg:w-96">
                <div>
                  <h2 className="flex justify-left mt-6 text-2xl font-extrabold text-neutral-600">
                    Create Health Service.
                  </h2>
                </div>

                <div className="mt-8">
                  <div className="mt-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label className="flex justify-left block text-sm font-medium text-neutral-600">
                          {" "}
                          Healthcare Name{" "}
                        </label>
                        <div className="mt-1">
                          <input
                            id="healthcare_name"
                            onChange={(e) => handleInputChange(e)}
                            name="healthcare_name"
                            type="text"
                            required=""
                            placeholder="Health Care Name"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="flex justify-left block text-sm font-medium text-neutral-600">
                          {" "}
                          Alias{" "}
                        </label>
                        <div className="mt-1">
                          <input
                            id="alias"
                            name="alias"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            required=""
                            placeholder="Alias"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="flex justify-left block text-sm font-medium text-neutral-600">
                          {" "}
                          Type{" "}
                        </label>
                        <div className="mt-1">
                          <input
                            id="type"
                            name="type"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            required=""
                            placeholder="Type"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="flex justify-left block text-sm font-medium text-neutral-600">
                          {" "}
                          Location{" "}
                        </label>
                        <div className="mt-1">
                          <input
                            id="location"
                            name="location"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            required=""
                            placeholder="Location"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-500 rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Create
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

export default CreateHealthService;
