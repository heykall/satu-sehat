import React, { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import { Patient, DiagnosticReport, HealthcareService } from '../mappingFiles';
import UseApiCall from '../utils/UseApiCall';
import SuccessModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const TableComponent = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [fetchMessage, setFetchMessage] = useState('');
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [sourceFields, setSourceFields] = useState([
    'id',
    'name',
    'address',
    'telephone',
    'disease'
  ])

  const [resourceCategories] = useState([
    'Patient',
    'DiagnosticReport',
    'HealthcareService'
  ]);

  const dataPool = useState([Patient, DiagnosticReport, HealthcareService])

  const [targetFields, setTargetField] = useState(Patient.listKey);
  const [connectionId, setConnectionId] = useState('')

  const [tempData, setTempData] = useState([]);
  const [selectedCaregory, setSelectedCaregory] = useState(null)


  // var sources_result_final = sourceFields.map((field, index) => {
  //   [field]: ""
  // } )
  const [sourcesResultFinal, setSourcesResultFinal] = useState([])
  const [dataMapSend, setDataMapSend] = useState({
    connection_id: "",
    table_name: "",
    fields: []
})

  const handleResourceCategoryChange = (index, e) => {
    // handleSelectedCategory(e.target.value)
    // console.log(`${e.target.value}`);
    // setTargetField(e.target.value.listkey)
    setTempData((prevState) => {
      const updatedFields = [...prevState];

      var field;
      if (e.target.value == "Patient") {
        field = Patient;
      } else if (e.target.value == "DiagnosticReport") {
        field = DiagnosticReport;
      } else if (e.target.value == "HealthcareService") {
        field = HealthcareService;
      } else {
        field = []
      }

      updatedFields[index] = {
        ...updatedFields[index],
        field: sourceFields[index],
        resourceCategory: e.target.value,
        resourceField: field,
      };
      return updatedFields;
    });


    
  };

  const handleChildStateChange = (childState) => {
    // console.log(childState, "ini dari child");
    setSourceFields(childState.data)
    setConnectionId(childState.user.data._id)
    setDataMapSend({
      connection_id: childState.user.data._id,
      table_name: childState.tableName,
      fields: []
  })

    // setSourceFields(childState)

    // console.log(`State from child: ${childState}`);
    // Do something with the child state in the parent component
  };

  const handleSelectedCategory = (selected) => {
    setSelectedCaregory(selected)
  }

  const handleTargetFieldChange = (index, e) => {
    // setTempData((prevState) => {
    //   const updatedFields = [...prevState];
    //   updatedFields[index] = {
    //     ...updatedFields[index],
    //     targetField: e.target.value,
    //   };
    //   return updatedFields;
    // });



    // setSourcesResultFinal((prevState) => {
    //   console.log(prevState, "<<< prev state");
    //   const updatedFields = [...prevState];

    //   console.log("before", updatedFields);


    //   updatedFields[sourceFields[index]] = tempData[index].resourceCategory.concat('.' + e.target.value);


    //   console.log("after", updatedFields);

    //   return updatedFields;
    // });


    setTempData((prevState) => {
      const updatedFields = [...prevState];

      // updatedFields[index] = {
      //   ...updatedFields[index],
      //   resourceCategory: e.target.value,
      //   resourceField: field,
      // };

      updatedFields[index] = {
        ...updatedFields[index],
        selectedResourceField: e.target.value,
      }

      return updatedFields;
    });

  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFetchMessage('');
    navigate('/workers', { state: { connectionId } })
  };


  const handleSave = async () => {
    // Perform save action with tempData data
    // console.log('Selected Fields:', tempData);

    var final = tempData.map((field, index) => {
      return {[field.field] : field.resourceCategory.concat("." + field.selectedResourceField)}
    })

    let dataSend = {...dataMapSend, fields: final}
    // console.log("FINAL RESULT ", dataSend);

    const dataFetch = await fetchData(import.meta.env.VITE_BASE_URL + '/data-migration','post', dataSend) 
    if (dataFetch) {
      setFetchMessage('Data successfully fetched!');
      console.log(dataFetch);
      setShowModal(true);
    }
  };

useEffect(()=> {
  console.log(connectionId);
  console.log(dataMapSend);
  // console.log(tempData, "ini selected field <<<<<")

  // console.log(sourcesResultFinal, "ini sources final");
  // console.log(selectedCaregory);
}, [tempData, selectedCaregory, targetFields, sourcesResultFinal, sourceFields, dataMapSend, connectionId])

  return (
    <>
    {showModal && (
        <SuccessModal message={fetchMessage} onClose={handleCloseModal} />
      )}
    <div className='flex flex-row mb-4'>
      <Dropdown onStateChange={handleChildStateChange}/>
    </div>
    <div>
      <table className="min-w-full border-4 border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100 border-b">Source Field</th>
            <th className="px-4 py-2 bg-gray-100 border-b">Resource FHIR Categories</th>
            <th className="px-4 py-2 bg-gray-100 border-b">Target Field</th>
          </tr>
        </thead>
        <tbody>
          {sourceFields.map((field, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b ">{field}</td>
              <td className="px-4 py-2 border-b">
                <select
                  className="w-full p-2 border-teal-400 rounded"
                  onChange={(e) => handleResourceCategoryChange(index, e)}
                >
                  <option value="">Select a category</option>
                  {resourceCategories.map((category, categoryIndex) => (
                    <option key={categoryIndex} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2 border-b">
                <select
                  className="w-full p-2 border rounded"
                  // value={tempData[index]?.targetField || ''}
                  onChange={(e) => handleTargetFieldChange(index, e)}
                >
                  <option value="">Select a target field</option>
                  {
                    tempData[index]?.resourceField ?
                    tempData[index].resourceField.listKey.map((target, targetIndex) => (
                      <option key={targetIndex} value={target}>
                        {target}
                      </option>
                    ))
                    :
                    <option value={null}>
                      data not found
                    </option>
                  }
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 mr-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
    </>
  );
};

export default TableComponent;