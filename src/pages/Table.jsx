import React, { useState } from 'react';

const TableComponent = () => {
  const [sourceFields] = useState([
    'Source Field 1',
    'Source Field 2',
    'Source Field 3',
    'Source Field 4',
    'Source Field 5',
    'Source Field 6',
    'Source Field 7',
    'Source Field 8',
    'Source Field 9',
    'Source Field 10',
  ]);

  const [resourceCategories] = useState([
    'Resource Category 1',
    'Resource Category 2',
    'Resource Category 3',
    'Resource Category 4',
    'Resource Category 5',
    'Resource Category 6',
    'Resource Category 7',
    'Resource Category 8',
    'Resource Category 9',
    'Resource Category 10',
  ]);

  const [targetFields] = useState([
    'Target Field 1',
    'Target Field 2',
    'Target Field 3',
    'Target Field 4',
    'Target Field 5',
    'Target Field 6',
    'Target Field 7',
    'Target Field 8',
    'Target Field 9',
    'Target Field 10',
  ]);

  const [selectedFields, setSelectedFields] = useState([]);

  const handleResourceCategoryChange = (index, e) => {
    setSelectedFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index] = {
        ...updatedFields[index],
        resourceCategory: e.target.value,
      };
      return updatedFields;
    });
  };

  const handleTargetFieldChange = (index, e) => {
    setSelectedFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index] = {
        ...updatedFields[index],
        targetField: e.target.value,
      };
      return updatedFields;
    });
  };

  const handleSave = () => {
    // Perform save action with selectedFields data
    console.log('Selected Fields:', selectedFields);
  };

  return (
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
                  value={selectedFields[index]?.targetField || ''}
                  onChange={(e) => handleTargetFieldChange(index, e)}
                >
                  <option value="">Select a target field</option>
                  {targetFields.map((target, targetIndex) => (
                    <option key={targetIndex} value={target}>
                      {target}
                    </option>
                  ))}
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
  );
};

export default TableComponent;
