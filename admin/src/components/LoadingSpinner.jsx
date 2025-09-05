import React from "react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-4 border-t-blue-400 border-r-blue-400 border-b-transparent border-l-transparent animate-spin animation-delay-100"></div>
      <div className="absolute inset-4 rounded-full border-4 border-t-blue-300 border-r-blue-300 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
    </div>
    <p className="text-gray-600 font-medium text-lg">Loading dashboard data</p>
    <div className="flex space-x-1">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  </div>
);

export default LoadingSpinner;