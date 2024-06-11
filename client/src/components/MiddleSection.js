import React from 'react';
import Card from './Card';

const MiddleSection = () => {
  return (
    <div className="flex justify-center ml-8"> {/* Added marginLeft */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex justify-center">
          <div className="max-w-screen-lg w-full">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
