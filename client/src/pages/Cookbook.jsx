import React, { useState } from 'react';
import SearchInput from '../components/Cookbook/SearchInput';
import CookbookCards from '../components/Cookbook/CookbookCards';
import { Container, Grid, Typography } from '@mui/material';

function Cookbook() {
  // State to store search results (recipes)
  const [recipes, setRecipes] = useState([]);

  // Function to update recipes based on search results
  const handleSearch = (recipes) => {
    setRecipes(recipes);
  };

  return (
    <Container maxWidth="md">
      {/* Page title */}
      <Typography variant="h1" sx={{ mb: 4 }}>
        Cookbook Finder
      </Typography>

      {/* Grid container for layout */}
      <Grid container spacing={2}>
        {/* Grid item for search input */}
        <Grid item xs={12}>
          <SearchInput onSearch={handleSearch} />
        </Grid>

        {/* Grid item for displaying cookbook cards */}
        <Grid item xs={12}>
          <CookbookCards recipes={recipes} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cookbook;
