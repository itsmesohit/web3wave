import React, { useState, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import FilterSlider from './FilterSlider';

const LeftSidebar = ({ setFilters }) => {
  const categories = [
    'Content Distribution',
    'Ads',
    'Youtube Influencer',
    'Telegram Influencer',
    'Instagram Influencer',
    'Twitter Influencer',
    'ICO Listing',
    'Exchange Listing'
  ];
  const regions = ['USA', 'INDIA', 'DUBAI'];
  const productTypes = ['web3', 'gambling', 'adult', 'gaming'];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [budget, setBudget] = useState(10000);

  useEffect(() => {
    setFilters({ categories: selectedCategories, regions: selectedRegions, productTypes: selectedProductTypes, budget });
  }, [selectedCategories, selectedRegions, selectedProductTypes, budget, setFilters]);

  return (
    <div className="bg-gray-200 p-4 ml-2 rounded-md shadow-md">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-4">
        <FilterDropdown
          title="Categories"
          options={categories}
          selectedOptions={selectedCategories}
          setSelectedOptions={setSelectedCategories}
        />
        <FilterDropdown
          title="Regions"
          options={regions}
          selectedOptions={selectedRegions}
          setSelectedOptions={setSelectedRegions}
        />
        <FilterDropdown
          title="Product Type"
          options={productTypes}
          selectedOptions={selectedProductTypes}
          setSelectedOptions={setSelectedProductTypes}
        />
        <FilterSlider
          title="Budget"
          min={0}
          max={10000}
          step={100}
          budget={budget}
          setBudget={setBudget}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
