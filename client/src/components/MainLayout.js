import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Card from './Card';

const MainLayout = () => {
  const [filters, setFilters] = useState({ categories: [], regions: [], productTypes: [], budget: 10000 });
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  return (
    <div className="relative flex flex-col justify-center items-center mt-8">
      <div className="flex w-full max-w-screen-xl">
        {/* Left Sidebar for larger screens */}
        <div className="hidden md:block w-1/6">
          <LeftSidebar setFilters={setFilters} />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/6 flex justify-center">
          <Card filters={filters} />
        </div>

        {/* Right Sidebar for larger screens */}
        <div className="hidden md:block w-1/6">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Full-Screen Overlays */}
      {showLeftSidebar && (
        <div className="fixed inset-0 z-20 bg-white p-4 overflow-y-auto">
          <button onClick={toggleLeftSidebar} className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded">
            Close
          </button>
          <LeftSidebar setFilters={setFilters} />
        </div>
      )}
      {showRightSidebar && (
        <div className="fixed inset-0 z-20 bg-white p-4 overflow-y-auto">
          <button onClick={toggleRightSidebar} className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded">
            Close
          </button>
          <RightSidebar />
        </div>
      )}

      {/* Mobile Buttons */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-gray-100 md:hidden">
        <button onClick={toggleLeftSidebar} className="bg-blue-500 text-white py-2 px-4 rounded">
          Filter
        </button>
        <button onClick={toggleRightSidebar} className="bg-green-500 text-white py-2 px-4 rounded">
          Publish
        </button>
      </div>
    </div>
  );
};

export default MainLayout;
