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
    fetchData(import.meta.env.VITE_BASE_URL + '/field-names?tableName=' + selectedOption + '&healthcare_id=' + localStorage.getItem('id'),'get', null, {
      access_token: JSON.parse(localStorage.getItem('user-token'))
  }).then(({data}) => {
    setStateField(data)
    props.onStateChange({data: data, tableName : event.target.value})
  })
  .catch(e => {
    console.log(e)
  })

    // try {
    //   const response = await fetchData(import.meta.env.VITE_BASE_URL + '/field-names?id=' + userCred.data._id + '&tableName=' + selectedOption,'get');
    //   // const data = await response.json();
    //   // console.log(response.data); // Log the fetched data
    //   setStateField(response.data)
    //   props.onStateChange({data: response.data, tableName : event.target.value, user: userCred})
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  const fetchTable = async () => {
      fetchData(import.meta.env.VITE_BASE_URL + '/table-names?healthcare_id=' + localStorage.getItem('id'),'get',null,{
        access_token: JSON.parse(localStorage.getItem('user-token'))
    }).then(({data}) => {
      console.log(data)
      setTableDb(data)
    })  
      // console.log(dataFetch, 'ini di fetch ke BE');
  };


useEffect(() => {
    fetchTable()
},[])

  return (
    <div>
      <select className="border border-gray-300 rounded px-4 py-2" value={selected} onChange={handleOptionChange}>
        <option value="">Select a table</option>
        {
          tablesDb ? tablesDb.map((db, index) => (
            <option key={index} value={db}>{db}</option>
          ))
          : <>
            <option value="null">No Table Exist</option>
          </>
        }
      </select>
    </div>
  )
};

export default Dropdown;   