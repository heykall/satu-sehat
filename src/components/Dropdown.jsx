import React from 'react';
import { useState, useEffect } from 'react';

const Dropdown = () => {
  const [tablesDb, setTableDb] = useState([
      'Patient',
      'Ruangan',
      'Penyakit',
      'Obat',
  ])

  const handleOptionChange = async (event) => {
    const selectedOption = event.target.value;

    try {
      const response = await fetch(`https://api.example.com/data?param=${selectedOption}`);
      const data = await response.json();
      console.log(data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log(tablesDb);
  },[])

  return (
    <div>
      <select className="border border-gray-300 rounded px-4 py-2" onChange={handleOptionChange}>
        <option value="">Select a table</option>
        {
          tablesDb.length? tablesDb.map((db, index) => (
            <option key={index} value={db}>{db}</option>
          ))
          : <>
            <option value="null">No Table Exist</option>
          </>
        }
      </select>
    </div>
  );
};

export default Dropdown;