import React from 'react';
import { useState, useEffect } from 'react';
import UseApiCall from '../utils/UseApiCall';
import Loading from './Loading';


const Dropdown = (props) => {
  const [tablesDb, setTableDb] = useState(null)
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [userCred, setUserCred] = useState(null)
  const [stateField, setStateField] = useState(null)
  const [selected, setSelected] = useState('')

  const handleOptionChange = async (event) => {
    const selectedOption = event.target.value;
    setSelected(event.target.value)
    try {
      const response = await fetchData(import.meta.env.VITE_BASE_URL + '/field-names?id=' + userCred.data._id + '&tableName=' + selectedOption,'get');
      // const data = await response.json();
      // console.log(response.data); // Log the fetched data
      setStateField(response.data)
      props.onStateChange({data: response.data, tableName : event.target.value, user: userCred})
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTable = async () => {
      const dataFetch = await fetchData(import.meta.env.VITE_BASE_URL + '/table-names?id=' + userCred.data._id,'get')  
      // console.log(dataFetch, 'ini di fetch ke BE');
      setTableDb(dataFetch)
  };

  const getCredUser = async () => {
    const dataUser = await JSON.parse(localStorage.getItem('user')) 
    setUserCred(dataUser)
  }

  useEffect(() => {
    getCredUser()
  },[])

useEffect(() => {
  if (userCred) {
    fetchTable()
  }
},[userCred])

if (isLoading) {
  return <Loading message={'Get the list Tables...'}/>;
} else {
  return (
    <div>
      <select className="border border-gray-300 rounded px-4 py-2" value={selected} onChange={handleOptionChange}>
        <option value="">Select a table</option>
        {
          tablesDb ? tablesDb.data.map((db, index) => (
            <option key={index} value={db}>{db}</option>
          ))
          : <>
            <option value="null">No Table Exist</option>
          </>
        }
      </select>
    </div>
  );
}
};

export default Dropdown;   