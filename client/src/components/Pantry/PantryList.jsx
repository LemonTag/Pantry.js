import React, { useState } from 'react';
import { Checkbox, Button, Container, Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, FormControlLabel } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_INGREDIENTS } from '../../../../server/mutations/getIngredients';
import { useNavigate } from 'react-router-dom';

const PantryList = () => {
  const { loading, error, data } = useQuery(GET_INGREDIENTS);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = (foodId) => {
    const currentIndex = selectedIngredients.indexOf(foodId);
    const newSelected = [...selectedIngredients];

    if (currentIndex === -1) {
      newSelected.push(foodId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedIngredients(newSelected);
  };

  const handleSearch = () => {
    navigate('/cookbook', { state: { ingredientIds: selectedIngredients } });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Pantry
      </Typography>
      <List>
        {data.ingredients.map((ingredient) => (
          <ListItem key={ingredient.foodId} button>
            <ListItemText
              primary={ingredient.food}
              secondary={`Quantity: ${ingredient.quantity} ${ingredient.measure}`}
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedIngredients.indexOf(ingredient.foodId) !== -1}
                    onChange={() => handleToggle(ingredient.foodId)}
                  />
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Container>
  );
};

export default PantryList;
