import React, { useRef, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const UploadExcel = ({ onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.xlsx')) {
      // Parse file for chart preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Upload to backend
        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
          await axiosInstance.post('/excel/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          toast.success('File uploaded and data saved to database!');
          if (onUploadSuccess) {
            onUploadSuccess({
              name: file.name,
              date: new Date().toLocaleString(),
              details: `Size: ${file.size} bytes`,
              data: jsonData, // Store parsed data for chart preview
            });
          }
        } catch (err) {
          toast.error('Upload failed.');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error('Please upload only .xlsx files');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="md:w-full mt-10 ml-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Excel File</h2>
      <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-gray-50">
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0l-4 4m4-4v12" />
          </svg>
        </div>
        <p className="text-gray-600 mb-2">Drag and drop your Excel file here, or</p>
        <button
          onClick={handleBrowseClick}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Browse Files'}
        </button>
        <p className="text-sm text-gray-400 mt-2">Supports .xlsx files only</p>
        <input
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadExcel;