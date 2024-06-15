import React, { useState } from 'react';
import { Checkbox, Button, Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, FormControlLabel, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_INGREDIENTS } from '../../utils/queries';
import { DELETE_INGREDIENT } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth';
import SearchModal from './SearchModal';

const PantryList = () => {
  const { loading, error, data } = useQuery(GET_ALL_INGREDIENTS);
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT,{
    update(cache, { data: { deleteIngredient } }) {
      const { getAllIngredients } = cache.readQuery({ query: GET_ALL_INGREDIENTS});
      const updatedIngredients = getAllIngredients.filter(
        ingredient => ingredient._id !== deleteIngredient._id
      );
      cache.writeQuery({
        query: GET_ALL_INGREDIENTS,
        data: {
          getAllIngredients: updatedIngredients,
        },
      });
    },
  });

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIngredientId, setCurrentIngredientId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal open/close
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
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

  const handleSearch = async () => {
    try {
      // Ensure AuthService is defined before using it
      if (AuthService) {
        const isLoggedIn = AuthService.loggedIn();
        if (!isLoggedIn) {
          setErrorMessage('Must be logged in');
          return;
        }
      } else {
        console.error('AuthService is not defined.');
        setErrorMessage('Authentication service is not available.');
        return;
      }

      // Get selected ingredient names to use as keywords
      const selectedIngredientNames = data.getAllIngredients
        .filter(ingredient => selectedIngredients.includes(ingredient._id))
        .map(ingredient => ingredient.food);

      if (selectedIngredientNames.length === 0) {
        setErrorMessage('Select at least one ingredient to search.');
        return;
      }

      // Construct query string with selected ingredient names
      const queryString = selectedIngredientNames.join('+');

      // Perform API request to Edamam with the constructed query string
      const response = await fetch(`https://api.edamam.com/search?q=${queryString}&app_id=e60d45ac&app_key=fcb5780894c4282cc330af20f9a037df`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes from Edamam');
      }

      const responseData = await response.json();
      const recipes = responseData.hits.map(hit => hit.recipe);
      setSearchResults(recipes);
      setModalOpen(true); // Open the modal with search results
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Failed to fetch recipes');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setSearchResults([]); // Clear search results
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentIngredientId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentIngredientId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteIngredient({ variables: { _id: currentIngredientId } });
      handleMenuClose();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Pantry
      </Typography>
      <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
        <List>
          {data.getAllIngredients.map((ingredient) => (
            <ListItem key={ingredient._id} button>
              <ListItemText
                primary={ingredient.food}
                secondary={`Quantity: ${ingredient.quantity || ''} ${ingredient.measure || ''}`}
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
                <IconButton onClick={(event) => handleMenuClick(event, ingredient._id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Update Quantity</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {/* Render the SearchModal component */}
      <SearchModal isOpen={modalOpen} onClose={handleCloseModal} searchResults={searchResults} />

      {/* Display error message */}
      {errorMessage && <p>{errorMessage}</p>}
    </Container>
  );
};

export default PantryList;
