import React, { useState, } from 'react';
import { Checkbox, Button, Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, FormControlLabel, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_INGREDIENTS } from '../../utils/queries';
import { DELETE_INGREDIENT } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

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
      await deleteIngredient({ variables: { _id: currentIngredientId} });
      
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
                  {/* On click delete go here */}
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
    </Container>
  );
};

export default PantryList;
