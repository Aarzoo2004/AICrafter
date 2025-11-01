import React from "react";
import { Home, ArrowLeft } from "lucide-react";

const NoPage = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#09090B] dark:to-[#141319] flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-800 mx-auto mb-8 rounded-full"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#17171C] text-purple-600 dark:text-purple-400 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-purple-600 dark:border-purple-500"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Home size={20} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
