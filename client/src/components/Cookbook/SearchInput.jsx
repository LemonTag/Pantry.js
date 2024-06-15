import React, { useState } from 'react';
import AuthService from "../../utils/auth";
import { TextField, Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

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
      setSearchResults(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Failed to fetch recipes');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Enter ingredient IDs, separated by commas"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{
          style: { color: 'black'}
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{backgroundColor: ''}}>
        Search
      </Button>

      {errorMessage && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {searchResults.length > 0 && (
        <List sx={{ marginTop: 2 }}>
          {searchResults.map((recipe) => (
            <ListItem key={recipe.uri} alignItems="flex-start">
              <Box>
                <Typography variant="h6">{recipe.label}</Typography>
                <Typography variant="body1">
                  <strong>Ingredients:</strong>
                </Typography>
                <List>
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <ListItem key={index}>
                      <ListItemText Black={ingredient} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchInput;
