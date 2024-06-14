import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_INGREDIENT } from '../../utils/mutations';
import { GET_ALL_INGREDIENTS } from '../../utils/queries';

const Pantry = () => {
  const [ingredientData, setIngredientData] = useState({
    text: '',
    quantity: '',
    measure: '',
    food: '',
    weight: '',
  });

  const [customAmount, setCustomAmount] = useState(false);

  const [addIngredient, { loading, error }] = useMutation(ADD_INGREDIENT, {
    update(cache, { data: { addIngredient } }) {
      const { getAllIngredients } = cache.readQuery({ query: GET_ALL_INGREDIENTS });
      cache.writeQuery({
        query: GET_ALL_INGREDIENTS,
        data: { getAllIngredients: [...getAllIngredients, addIngredient] },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIngredientData({
      ...ingredientData,
      [name]: value,
    });
  };

  const handleCustomAmountChange = () => {
    setCustomAmount(!customAmount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addIngredient({
        variables: {
          text: ingredientData.text,
          quantity: parseFloat(ingredientData.quantity),
          measure: ingredientData.measure,
          food: ingredientData.food,
          weight: parseFloat(ingredientData.weight),
        },
      });
      if (data) {
        console.log('Ingredient added:', data.addIngredient);
        setIngredientData({
          text: '',
          quantity: '',
          measure: '',
          food: '',
          weight: '',
        });
        setCustomAmount(false);
      }
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Add Ingredient to Pantry
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Food Item"
              name="food"
              value={ingredientData.food}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={customAmount}
                  onChange={handleCustomAmountChange}
                  name="customAmount"
                  color="primary"
                />
              }
              label="Add custom amounts"
            />
          </Grid>
          {customAmount && (
            <>
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={ingredientData.quantity}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="measure-label">Measure</InputLabel>
                  <Select
                    labelId="measure-label"
                    id="measure"
                    name="measure"
                    value={ingredientData.measure}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="pounds">Pounds</MenuItem>
                    <MenuItem value="grams">Grams</MenuItem>
                    <MenuItem value="liters">Liters</MenuItem>
                    <MenuItem value="gallons">Gallons</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Ingredient'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && <p>Error adding ingredient: {error.message}</p>}
    </Container>
  );
};

export default Pantry;
