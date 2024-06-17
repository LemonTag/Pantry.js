import React, { useState } from 'react';
import AuthService from "../../utils/auth";
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Fade } from '@mui/material';

const CookbookCards = ({ recipes }) => {
  const isLoggedIn = AuthService.loggedIn();
  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  const currentUserId = AuthService.getProfile().data._id;

  const [addRecipe, { error }] = useMutation(ADD_RECIPE);

  const handleAddRecipe = async (recipe) => {
    try {
      await addRecipe({
        variables: {
          label: recipe.label,
          image: recipe.image,
          url: recipe.url,
          ingredientLines: recipe.ingredientLines,
          userId: currentUserId,  // Pass the current user's ID to the mutation
        },
      });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.uri}>
          <Fade in timeout={500} style={{ transitionDelay: `${index * 200}ms` }}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column',  }}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt={recipe.label}
              />
              <CardContent style={{ flex: '1 0 auto', maxHeight: 250, overflowY: 'auto', color: 'black' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.label}
                </Typography>
                <Typography variant="body2" color="black" fontWeight={'bold'}>
                  Ingredients:
                </Typography>
                <div>
                  <ul style={{ maxHeight: 120, overflowY: 'auto', paddingInlineStart: 20, }}>
                    {recipe.ingredientLines.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div style={{ marginTop: 'auto', padding: '10px' }}>
                <Button
                  sx={{backgroundColor:'#5DBB63'}}
                  variant="contained"
                  color={"primary"}
                  style={{ minWidth: '100%', marginBottom: '10px' }}
                  onClick={() => handleAddRecipe(recipe)}
                >
                  Add to Favorites
                </Button>
                <Button 
                  sx={{backgroundColor:'#BB5D7C'}}
                  variant="contained"
                  color={"primary"}
                  style={{ minWidth: '100%' }}
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </Button>
              </div>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

export default CookbookCards;
