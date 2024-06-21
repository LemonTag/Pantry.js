import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_INGREDIENT } from '../../utils/mutations';
import { GET_ALL_INGREDIENTS } from '../../utils/queries';
import AuthService from "../../utils/auth";

const Pantry = () => {
  const isLoggedIn = AuthService.loggedIn();
  const currentUserId = isLoggedIn ? AuthService.getProfile().data._id : null;
  console.log('Current User ID:', currentUserId);

  const [ingredientData, setIngredientData] = useState({
    text: '',
    quantity: '',
    measure: '',
    food: '',
    weight: '',
    userId: currentUserId,
  });

  const [customAmount, setCustomAmount] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [addIngredient,{loading, error}] = useMutation(ADD_INGREDIENT, {
    update(cache, { data: { addIngredient } }) {
      // Read the cache data for the GET_ALL_INGREDIENTS query
      const { getAllIngredients } = cache.readQuery({
        query: GET_ALL_INGREDIENTS,
        variables: { userId: currentUserId }, // Include variables if necessary
      });
  
      // Modify the cache data to include the new ingredient
      cache.writeQuery({
        query: GET_ALL_INGREDIENTS,
        variables: { userId: currentUserId }, // Include variables if necessary
        data: {
          getAllIngredients: [...getAllIngredients, addIngredient], // Assuming addIngredient returns the newly added ingredient
        },
      });
    },
  });

  useEffect(() => {
    // You can set other state based on login status if needed
    // setIsLoggedIn(AuthService.loggedIn());
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
      if (!isLoggedIn) {
        setErrorMessage('Must be logged in to add ingredients.');
        return;
      }

      const { data } = await addIngredient({
        variables: {
          userId: currentUserId,
          food: ingredientData.food,
          text: ingredientData.text || null,
          quantity: ingredientData.quantity ? parseFloat(ingredientData.quantity) : null,
          measure: ingredientData.measure || null,
          weight: ingredientData.weight ? parseFloat(ingredientData.weight) : null,
        },
      });

      if (data && data.addIngredient) {
        console.log('Ingredient added:', data.addIngredient);
        setIngredientData({
          text: '',
          quantity: '',
          measure: '',
          food: '',
          weight: '',
          userId: currentUserId,
        });
        setCustomAmount(false);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to add ingredient. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding ingredient:', error.message);
      setErrorMessage('Failed to add ingredient. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 4, color: '#001F3F' }}>
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
              InputLabelProps={{
                style: { color: '#000000' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#5DBB63',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5DBB63',
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
              label="Add Custom Amount"
              sx={{ color: '#001F3F' }}
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
                    sx={{ color: 'black' }}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading || !isLoggedIn}
              sx={{ backgroundColor: '#001F3F' }}
            >
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