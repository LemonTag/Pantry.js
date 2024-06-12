import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const ingredients = inputValue.split(',').map((item) => item.trim());
    onSearch(ingredients);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter ingredient IDs, separated by commas"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchInput;