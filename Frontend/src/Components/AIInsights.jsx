import React from 'react';

const AIInsights = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md md:w-full md:h-[295px] max-w-4xl ml-10 mt-10 md:w-2/3 relative">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg">AI Insights</h2>
      
      </div>
      <div className="flex flex-col items-center justify-center h-40 text-gray-500 mt-6">
        <span className="text-3xl mb-2">💡</span>
        <p>Select a file to generate AI insights</p>
      </div>
    </div>
  );
};

export default AIInsights;
