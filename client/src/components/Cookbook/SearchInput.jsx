import React, { useState } from 'react';
import AuthService from "../../utils/auth";
import { TextField, Button, Typography, Box } from '@mui/material';



const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
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
      console.log('Fetched recipes:', recipes); // Log fetched recipes
      onSearch(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Failed to fetch recipes');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Enter Ingredients, Separated with Commas"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleChange}
        sx={{ marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#5DBB63', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5DBB63', // Change this to your desired highlight color
            },
          },
        }}
        InputLabelProps={{
          style: { color: '#000000'}
          
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{backgroundColor: '#001F3F'}}>
        Search
      </Button>

      {errorMessage && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SearchInput;
