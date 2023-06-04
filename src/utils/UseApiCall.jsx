import { useState, useEffect } from "react";
import axios from "axios";

const UseApiCall = (method, url, body = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    try {
        let response;

        if (method === "get") {
            response = await axios.get(url);
        } else if (method === "post") {
            response = await axios.post(url, body);
        } else if (method === "edit") {
            response = await axios.put(url, body);
        }

        setData(response.data);
      setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [method, url, body]);

  return { data, isLoading, error };
};

export default UseApiCall;
