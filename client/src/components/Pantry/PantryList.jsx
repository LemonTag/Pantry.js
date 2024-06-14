import React, { useState } from 'react';
import { Checkbox, Button, Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, FormControlLabel } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_INGREDIENTS } from '../../utils/queries';
import { useNavigate } from 'react-router-dom';

const PantryList = () => {
  const { loading, error, data } = useQuery(GET_ALL_INGREDIENTS);
  console.log(data)
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = (id) => {
    const currentIndex = selectedIngredients.indexOf(id);
    const newSelected = [...selectedIngredients];

    if (currentIndex === -1) {
      newSelected.push(id);
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
        {data.getAllIngredients.map((ingredient) => (
          <ListItem key={ingredient._id} button>
            <ListItemText
              primary={ingredient.food}
              secondary={`Quantity: ${ingredient.quantity} ${ingredient.measure}`}
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedIngredients.indexOf(ingredient._id) !== -1}
                    onChange={() => handleToggle(ingredient._id)}
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