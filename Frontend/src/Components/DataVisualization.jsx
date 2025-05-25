import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis,
  Tooltip, CartesianGrid, ResponsiveContainer,
  Label
} from 'recharts';
import ThreeDBarChart from './ThreeDBarChart';

const COLORS = ['#7c3aed', '#facc15', '#34d399', '#f87171', '#60a5fa'];

const ChartSwitcher = ({ chartType, setChartType }) => {
  const types = [
    { label: 'Bar', icon: '📊' },
    { label: 'Line', icon: '📈' },
    { label: 'Pie', icon: '🥧' },
    { label: 'Scatter', icon: '✨' },
    { label: '3D', icon: '🧊' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {types.map(({ label, icon }) => (
        <button
          key={label}
          onClick={() => setChartType(label)}
          className={`flex items-center space-x-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
            ${chartType === label
              ? 'bg-violet-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 dark:text-black hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

const getColumns = (data) => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
};

const DataVisualization = ({ chartData, chartType, setChartType }) => {
  // Dynamic axes state
  const columns = useMemo(() => getColumns(chartData), [chartData]);
  const [xAxis, setXAxis] = useState(columns[0] || 'label');
  const [yAxis, setYAxis] = useState(columns[1] || 'value');

  // Update axes if data changes
  React.useEffect(() => {
    setXAxis(columns[0] || 'label');
    setYAxis(columns[1] || 'value');
  }, [columns]);

  // Prepare data for recharts and 3D chart
  const chartReadyData = useMemo(() => {
    if (!chartData) return [];
    return chartData.map(row => ({
      ...row,
      label: row[xAxis],
      value: Number(row[yAxis])
    }));
  }, [chartData, xAxis, yAxis]);

  // Animate chart area on chartType change
  const [chartKey, setChartKey] = useState(0);
  React.useEffect(() => {
    setChartKey((k) => k + 1);
  }, [chartType, xAxis, yAxis]);

  return (
    <div className="md:w-full mt-10 ml-10 p-6 bg-white rounded-2xl shadow-lg animate-fade-in" style={{ animation: 'fade-in 0.7s' }}>
      <h2 className="font-semibold text-xl text-gray-800 mb-4">Data Visualization</h2>

      <ChartSwitcher chartType={chartType} setChartType={setChartType} />

      {chartData && columns.length > 1 ? (
        <>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X Axis:</label>
              <select
                value={xAxis}
                onChange={e => setXAxis(e.target.value)}
                className="border rounded px-2 py-1 focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
              >
                {columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Y Axis:</label>
              <select
                value={yAxis}
                onChange={e => setYAxis(e.target.value)}
                className="border rounded px-2 py-1 focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
              >
                {columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="text-center font-semibold mb-2 text-gray-700">
            {chartReadyData?.[0]?.name}
          </h3>

          <div className="w-full h-64 transition-all duration-300 animate-fade-in" key={chartKey}>
            {chartType !== '3D' ? (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'Bar' && (
                  <BarChart data={chartReadyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label">
                      <Label value={xAxis} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                      <Label
                        value={yAxis}
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                      />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="value" fill="#7c3aed" />
                  </BarChart>
                )}

                {chartType === 'Line' && (
                  <LineChart data={chartReadyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label">
                      <Label value={xAxis} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                      <Label
                        value={yAxis}
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                      />
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#34d399" />
                  </LineChart>
                )}

                {chartType === 'Pie' && (
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={chartReadyData}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartReadyData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                )}

                {chartType === 'Scatter' && (
                  <ScatterChart>
                    <CartesianGrid />
                    <XAxis type="category" dataKey="label">
                      <Label value={xAxis} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey="value">
                      <Label
                        value={yAxis}
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                      />
                    </YAxis>
                    <Tooltip />
                    <Scatter data={chartReadyData} fill="#f87171" />
                  </ScatterChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div style={{ width: '100%', height: '350px' }}>
                <ThreeDBarChart data={chartReadyData} />
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth={2} fill="none" />
          </svg>
          Click to preview a chart here.
        </p>
      )}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s;
          }
        `}
      </style>
    </div>
  );
};

export default DataVisualization;