import React, { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import { Patient, DiagnosticReport, HealthcareService } from '../mappingFiles';
import UseApiCall from '../utils/UseApiCall';
import SuccessModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const TableComponent = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fetchMessage, setFetchMessage] = useState('');
  const { isLoading, data, error, fetchData } = UseApiCall();
  const [sourceFields, setSourceFields] = useState([
    'id',
    'name',
    'address',
    'telephone',
    'disease'
  ]);

  const [resourceCategories] = useState([
    'Patient',
    'DiagnosticReport',
    'HealthcareService'
  ]);

  const dataPool = useState([Patient, DiagnosticReport, HealthcareService]);

  const [targetFields, setTargetField] = useState(Patient.listKey);
  const [connectionId, setConnectionId] = useState('');

  const [tempData, setTempData] = useState([]);
  const [selectedCaregory, setSelectedCaregory] = useState(null);

  const handleResourceCategoryChange = (index, e) => {
    setTempData((prevState) => {
      const updatedFields = [...prevState];

      var field;
      if (e.target.value === 'Patient') {
        field = Patient;
      } else if (e.target.value === 'DiagnosticReport') {
        field = DiagnosticReport;
      } else if (e.target.value === 'HealthcareService') {
        field = HealthcareService;
      } else {
        field = [];
      }

      updatedFields[index] = {
        ...updatedFields[index],
        field: sourceFields[index],
        resourceCategory: e.target.value,
        resourceField: field
      };
      return updatedFields;
    });
  };

  const handleChildStateChange = (childState) => {
    setSourceFields(childState.data);
    setConnectionId(childState.user.data._id);
    setTempData([]);
  };

  const handleSelectedCategory = (selected) => {
    setSelectedCaregory(selected);
  };

  const handleTargetFieldChange = (index, e) => {
    setTempData((prevState) => {
      const updatedFields = [...prevState];

      updatedFields[index] = {
        ...updatedFields[index],
        selectedResourceField: e.target.value
      };

      return updatedFields;
    });
  };

  const handleAddRow = (index) => {
    setSourceFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields.splice(index + 1, 0, ''); // Insert an empty field at the next index
      return updatedFields;
    });

    setTempData((prevState) => {
      const updatedFields = [...prevState];
      const duplicatedRow = { ...updatedFields[index] }; // Duplicate the selected row
      updatedFields.splice(index + 1, 0, duplicatedRow); // Insert the duplicated row at the next index
      return updatedFields;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFetchMessage('');
    navigate('/workers', { state: { connectionId } });
  };

  const handleSave = async () => {
    var final = tempData.map((field, index) => {
      return { [field.field]: field.resourceCategory.concat('.' + field.selectedResourceField) };
    });

    let dataSend = { connection_id: connectionId, table_name: '', fields: final };

    const dataFetch = await fetchData(import.meta.env.VITE_BASE_URL + '/data-migration', 'post', dataSend);
    if (dataFetch) {
      setFetchMessage('Data successfully fetched!');
      setShowModal(true);
    }
  };

  useEffect(() => {
    console.log(tempData);
  }, [selectedCaregory, targetFields, sourceFields, connectionId, tempData]);

  useEffect(() => {
    if (sourceFields.length) {
      const newMap = sourceFields.map(field => {
        return {field: field, resourceCategory: '', resourceField: {}}
      })
      setTempData(newMap)
      console.log(newMap);
    }
    console.log(sourceFields);
  }, []);

  if (isLoading) {
    return <Loading message={'Fetching the Database Table...'} />;
  } else {
    return (
      <>
        <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Database Puskesmas Kalibata</button>
        </div>
        {showModal && <SuccessModal message={fetchMessage} onClose={handleCloseModal} />}
        <div className="flex flex-row mb-4">
          <Dropdown onStateChange={handleChildStateChange} />
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
              {tempData.map((field, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-teal-200' : 'bg-gray-200'}`}>
                  <td className="px-4 py-2 border-b">{field.field}</td>
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
                      onChange={(e) => handleTargetFieldChange(index, e)}
                    >
                      <option value="">Select a target field</option>
                      {/* {tempData[index]?.resourceField ? (
                        tempData[index].resourceField.listKey.map((target, targetIndex) => (
                          <option key={targetIndex} value={target}>
                            {target}
                          </option>
                        ))
                      ) : (
                        <option value={null}>data not found</option>
                      )} */}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-500" onClick={() => handleAddRow(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default TableComponent;
