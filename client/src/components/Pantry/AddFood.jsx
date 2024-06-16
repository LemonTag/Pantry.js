import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_INGREDIENT } from '../../utils/mutations';
import { GET_ALL_INGREDIENTS } from '../../utils/queries';
import AuthService from "../../utils/auth";

const Pantry = () => {
   
   const [ingredientData, setIngredientData] = useState({
    text: '',
    quantity: '',
    measure: '',
    food: '',
    weight: '',
  });

  const [customAmount, setCustomAmount] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [addIngredient, { loading, error }] = useMutation(ADD_INGREDIENT, {
    update(cache, { data: { addIngredient } }) {
      const { getAllIngredients } = cache.readQuery({ query: GET_ALL_INGREDIENTS });
      cache.writeQuery({
        query: GET_ALL_INGREDIENTS,
        data: { getAllIngredients: [...getAllIngredients, addIngredient] },
      });
    },
  });

  useEffect(() => {
    setIsLoggedIn(AuthService.loggedIn());
  }, []);

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
        const isLoggedIn = AuthService.loggedIn();
        if (!isLoggedIn) {
          setErrorMessage('Must be logged in');
          return;
        }
  
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
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 4, color: '#001F3F'}}>
        Add Ingredients to List
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#5DBB63', // Change border color to red on hover
                  },
                },
              }}
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
              label="Add Custom Amount" sx = {{color: '#001F3F'}}
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
                    sx = {{color: 'black'}}
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
            <Button variant="contained" color="primary" type="submit" disabled={loading} sx={{backgroundColor:'#001F3F'}}>
              {loading ? 'Adding...' : 'Add Ingredient'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {errorMessage && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
      {error && <p>Error adding ingredient: {error.message}</p>}
    </Container>
  );
};

export default Pantry;
