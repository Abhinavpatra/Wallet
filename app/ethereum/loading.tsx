import React from 'react';


export default function Loading ()  {
  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white animate-pulse">
      <div className="absolute top-4 right-4 w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full blur-sm glow"></div>

      <div className="flex justify-center pt-20">
        <div className="space-x-4">
          <div className="inline-block w-40 h-12 bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 rounded-lg blur-sm glow">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-md opacity-80"></div>
          </div>

          <div className="inline-block w-40 h-12 bg-gradient-to-br from-red-200 via-blue-300 to-red-200 rounded-lg blur-sm glow">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-md opacity-80"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
