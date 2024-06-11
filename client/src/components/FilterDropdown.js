import React, { useState } from 'react';

const FilterDropdown = ({ title, options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  return (
    <div className="mt-4 border border-gray-300 rounded-md p-4">
      <h3 className="font-semibold text-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▲' : '▼'}
      </h3>
      {isOpen && (
        <div className="mt-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
                className="mr-2"
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
