import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';
import CookbookCards from '../Cookbook/CookbookCards';

const SearchModal = ({ isOpen, onClose, searchResults }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  const [addRecipe, { error }] = useMutation(ADD_RECIPE);

  const handleAddRecipe = async (recipe) => {
    try {
      await addRecipe({
        variables: {
          label: recipe.label,
          image: recipe.image,
          url: recipe.url,
          ingredientLines: recipe.ingredientLines,
        },
      });
      console.log('Recipe added successfully!');
    } catch (error) {
      console.error('Error adding recipe:', error.message);
      console.error('Error details:', error.graphQLErrors, error.networkError);
      if (error.networkError && error.networkError.statusCode === 400) {
        console.error('Bad request error:', error.networkError.result);
      }
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 900, height: 800, overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Search Results
        </Typography>
        <CookbookCards recipes={searchResults} handleAddRecipe={handleAddRecipe} />
        <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 3 }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default SearchModal;
