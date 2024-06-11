import React, { useState } from 'react';

const FilterSlider = ({ title, min, max, step, budget, setBudget }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSliderChange = (e) => {
    setBudget(e.target.value);
  };

  return (
    <div className="mt-4 border border-gray-300 rounded-md p-4">
      <h3 className="font-semibold text-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▲' : '▼'}
      </h3>
      {isOpen && (
        <div className="mt-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={budget}
            onChange={handleSliderChange}
            className="w-full"
          />
          <div className="text-center mt-2">${budget}</div>
        </div>
      )}
    </div>
  );
};

export default FilterSlider;
