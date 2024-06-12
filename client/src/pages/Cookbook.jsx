import React, { useState } from 'react';
import SearchInput from '../components/Cookbook/SearchInput';
import CookbookCards from '../components/Cookbook/CookbookCards';

function Cookbook() {
  const [ingredientIds, setIngredientIds] = useState([]);

  const handleSearch = (ingredients) => {
    setIngredientIds(ingredients);
  };

  return (
    <div className="App">
      <h1>Cookbook Finder</h1>
      <SearchInput onSearch={handleSearch} />
      <CookbookCards ingredients={ingredientIds} />
    </div>
  );
}

export default Cookbook;