import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=e60d45ac&app_key=fcb5780894c4282cc330af20f9a037df`);
      const data = await response.json();
      const recipes = data.hits;
      setSearchResults(recipes);
      onSearch(recipes);
    } catch (error) {
      console.error(error);
    }
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
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((recipe) => (
            <li key={recipe.recipe.uri}>
              <h2>{recipe.recipe.label}</h2>
              <ul>
                <h3>Ingredients:</h3>
                {recipe.recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;