import React, { useState } from 'react';

const UploadHistory = ({ files, setFiles, onPreviewChart }) => {
  const [showHistory, setShowHistory] = useState(true);

  const deleteFile = (indexToDelete) => {
    const newFiles = files.filter((_, i) => i !== indexToDelete);
    setFiles(newFiles);
  };

  return (
    <div className="md:w-full mt-10 ml-10 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Upload History</h2>
        <button
          className="text-sm text-blue-500 hover:underline cursor-pointer"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide' : 'Show'}
        </button>
      </div>

      {showHistory && (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {files.map((file, index) => (
            <div key={index} className="border rounded-md p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{file.date}</p>
                  <p className="text-sm mt-1 text-gray-600 truncate">{file.details}</p>
                </div>
                <div className="flex space-x-2 mt-1">
                  <button
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    onClick={() => onPreviewChart && onPreviewChart(file.data)}
                    title="Preview"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
                      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth={2} fill="none" />
                    </svg>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={() => deleteFile(index)}
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {files.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-2">No uploads yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadHistory;