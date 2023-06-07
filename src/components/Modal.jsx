import React from 'react';

function SuccessModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-teal-500 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Success!</h2>
        <p className="text-lg mb-4">{message}</p>
        <button
          className="px-4 py-2 bg-teal-600 rounded-lg hover:bg-teal-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;