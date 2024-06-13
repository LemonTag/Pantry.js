import React, { useState } from 'react';
import SearchInput from '../components/Cookbook/SearchInput'; // Assuming SearchInput is valid and MUI-compatible
import CookbookCards from '../components/Cookbook/CookbookCards'; // Assuming CookbookCards is valid and MUI-compatible
import { Container, Grid, Typography } from '@mui/material';

function Cookbook() {
  // State to store selected ingredient IDs
  const [ingredientIds, setIngredientIds] = useState([]);

  // Function to update ingredient IDs based on search results
  const handleSearch = (ingredients) => {
    setIngredientIds(ingredients);
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
          <CookbookCards ingredients={ingredientIds} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cookbook;
