import React, { useState } from 'react';
import AuthService from "../../utils/auth";

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');



  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const isLoggedIn = AuthService.loggedIn();
      if (!isLoggedIn) {
        setErrorMessage('Must be logged in');
        return;
      }

      const response = await fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=e60d45ac&app_key=fcb5780894c4282cc330af20f9a037df`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes from Edamam');
      }

      const data = await response.json();
      const recipes = data.hits.map(hit => hit.recipe);
      onSearch(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Failed to fetch recipes');
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

      {errorMessage && <p>{errorMessage}</p>}
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
