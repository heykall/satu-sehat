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
      } else if(e.target.value === 'Extensions') {
        field = []
      }else {
        field = [];
      }
      
      if (e.target.value === 'Extensions') {
        updatedFields[index] = {
          ...updatedFields[index],
          resourceCategory: e.target.value,
          resourceField: field,
          selectedResourceField: updatedFields[index].field
        };
      } else {
        updatedFields[index] = {
          ...updatedFields[index],
          resourceCategory: e.target.value,
          resourceField: field
        };
      }
      
      return updatedFields;
    });
  };

  const handleChildStateChange = (childState) => {
    // console.log(childState);
    setSourceFields(childState.data);
    // console.log(sourceFields, 'ini source field');
    // setConnectionId(childState.user.data._id);
    // setTempData();
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

  // handle delete row

  const removeRow = (index) => {
    setSourceFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields.splice(index, 1); // Remove the field at the specified index
      return updatedFields;
    });
  
    setTempData((prevState) => {
      const updatedFields = [...prevState];
      updatedFields.splice(index, 1); // Remove the duplicated row at the specified index
      return updatedFields;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFetchMessage('');
    navigate('/workers', { state: { connectionId } });
  };

  const handleSave = async () => {
    const dataSchema = {
      "schema": [
        {
          "patient": [
            {
              "kd_kab": "Patient.gender"
            },
            {
              "tgl_daftar": "HealthcareService.active"
            },
            {
              "suku_bangsa": "Extensions.suku_bangsa"
            },
            {
              "bahasa_pasien": "Patient.birthDate"
            },
            {
              "cacat_fisik": "Extensions.cacat_fisik"
            },
            {
              "tgl_lahir": "Patient.birthDate"
            },
            {
              "kd_kel": "Extensions.kd_kel"
            },
            {
              "kd_prop": "Extensions.kd_prop"
            },
            {
              "kd_kec": "Extensions.kd_kec"
            },
            {
              "stts_nikah": "Patient.maritalStatus.coding.code"
            },
            {
              "agama": "Extensions.agama"
            },
            {
              "no_tlp": "Patient.telecom.use"
            },
            {
              "umur": "Patient.birthDate"
            },
            {
              "pnd": "Extensions.pnd"
            },
            {
              "keluarga": "Patient.contact.name.family"
            },
            {
              "namakeluarga": "Extensions.namakeluarga"
            },
            {
              "kd_pj": "Extensions.kd_pj"
            },
            {
              "no_peserta": "Extensions.no_peserta"
            },
            {
              "pekerjaanpj": "Extensions.pekerjaanpj"
            },
            {
              "alamatpj": "Extensions.alamatpj"
            },
            {
              "kelurahanpj": "Extensions.kelurahanpj"
            },
            {
              "kecamatanpj": "Extensions.kecamatanpj"
            },
            {
              "kabupatenpj": "Extensions.kabupatenpj"
            },
            {
              "perusahaan_pasien": "Extensions.perusahaan_pasien"
            },
            {
              "email": "Extensions.email"
            },
            {
              "nip": "Extensions.nip"
            },
            {
              "no_rkm_medis": "Extensions.no_rkm_medis"
            },
            {
              "propinsipj": "Extensions.propinsipj"
            },
            {
              "nm_pasien": "Extensions.nm_pasien"
            },
            {
              "no_ktp": "Extensions.no_ktp"
            },
            {
              "jk": "Extensions.jk"
            },
            {
              "tmp_lahir": "Patient.address.use"
            },
            {
              "nm_ibu": "Patient.contact.name.family"
            },
            {
              "alamat": "Patient.address.use"
            },
            {
              "gol_darah": "Extensions.gol_darah"
            },
            {
              "pekerjaan": "Extensions.pekerjaan"
            }
          ]
        },
        {
          "medication": [
              {
                "prioritas": "Patient.identifier.system"
              },
              {
                "no_rawat": "Patient.identifier.system"
              },
              {
                "kd_penyakit": "Patient.identifier.system"
              },
              {
                "status": "Patient.identifier.system"
              },
              {
                "status_penyakit": "Extensions.status_penyakit"
              }
            ]
        }
      ]
    }

    fetchData(
      import.meta.env.VITE_BASE_URL + "/schema?healthcare_id=" + localStorage.getItem('id'),
      "post",
      dataSchema,
      {
          access_token: JSON.parse(localStorage.getItem('user-token'))
      }
    ).then(({data}) => {
      console.log(data);
      navigate('/dashboard-worker/' + localStorage.getItem('id'))
    })
    .catch((e) => {
      console.log(e)
    })
    // var final = tempData.map((field, index) => {
    //   return { [field.field]: field.resourceCategory.concat('.' + field.selectedResourceField) };
    // });
    // console.log(final);

    // let dataSend = { connection_id: connectionId, table_name: '', fields: final };
    // console.log(dataSend);
    // const dataFetch = await fetchData(import.meta.env.VITE_BASE_URL + '/data-migration', 'post', dataSend);
    // if (dataFetch) {
    //   setFetchMessage('Data successfully fetched!');
    //   setShowModal(true);
    // }
  };

  useEffect(() => {
    console.log(tempData);
  }, [selectedCaregory, targetFields, sourceFields, connectionId, tempData]);

  useEffect(() => {
    if (sourceFields.length) {
      const newMap = sourceFields.map(field => {
        return {field: field, resourceCategory: '', resourceField: []}
      })
      setTempData(newMap)
      console.log(newMap);
    }
  }, [sourceFields]);

  if (isLoading) {
    return <Loading message={'Fetching the Database Table...'} />;
  } else {
    return (
      <>
        <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-gray-500 text-sm text-white px-2 py-1">Logout</button>
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
                      <option value="Extensions">Extensions</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      className="w-full p-2 border rounded"
                      onChange={(e) => handleTargetFieldChange(index, e)}
                    >
                      <option value="">Select a target field</option>
                      {tempData[index]?.resourceField ? (
                        tempData[index].resourceField.listKey?.map((target, targetIndex) => (
                          <option key={targetIndex} value={target}>
                            {target}
                          </option>
                        ))
                      ) : (
                        <option value={null}>data not found</option>
                      )}
                      {/* {tempData[index]?.resourceCategories === 'Extensions' ? (
                        <option value={}></option>
                      ) : (
                        <option value={null}>data not found</option>
                      )} */}
                    </select>
                  </td>
                  {/* <td className="px-2 py-2 border-b">
                    <button className="text-blue-500" onClick={() => removeRow(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                    </button>
                  </td> */}
                  {/* <td className="px-2 py-2 border-b">
                    <button className="text-blue-500" onClick={() => handleAddRow(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </td> */}
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
