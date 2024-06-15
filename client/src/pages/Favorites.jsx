import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import FavoritesCards from '../components/Favorites/FavoritesCards';

const Favorites = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 3, color: '#001F3F', display: 'flex', justifyContent: 'center'}}>
        Your Favorites
      </Typography>
      <FavoritesCards />
    </Container>
  );
};

export default Favorites;
