import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './Components/ResponsiveAppBar.jsx';
import UploadExcel from './Components/UploadExcel.jsx';
import DataVisualization from './Components/DataVisualization.jsx';
import UploadHistory from './Components/UploadHistory.jsx';
import AIInsights from './Components/AIInsights.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';

const MainApp = ({
  files,
  setFiles,
  addFileToHistory,
  selectedChartData,
  setSelectedChartData,
  chartType,
  setChartType,
}) => (
  <>
    <ResponsiveAppBar />
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full flex flex-col md:flex-row ">
        <UploadExcel onUploadSuccess={addFileToHistory} />
        <DataVisualization
          chartData={selectedChartData}
          chartType={chartType}
          setChartType={setChartType}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row ">
        <UploadHistory
          files={files}
          setFiles={setFiles}
          onPreviewChart={setSelectedChartData}
        />
        <AIInsights />
      </div>
    </div>
  </>
);

const App = () => {
  const [selectedChartData, setSelectedChartData] = useState(null);
  const [chartType, setChartType] = useState('Bar');
  const [files, setFiles] = useState([]);

  // Add uploaded file info to history
  const addFileToHistory = (fileData) => {
    setFiles((prevFiles) => [...prevFiles, fileData]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <MainApp
              files={files}
              setFiles={setFiles}
              addFileToHistory={addFileToHistory}
              selectedChartData={selectedChartData}
              setSelectedChartData={setSelectedChartData}
              chartType={chartType}
              setChartType={setChartType}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;