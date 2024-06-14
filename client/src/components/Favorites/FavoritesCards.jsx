import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Fade } from '@mui/material';
import { GET_ALL_RECIPES } from '../../utils/queries';
import { DELETE_RECIPE } from '../../utils/mutations';

const FavoritesCards = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_RECIPES);

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache, { data: { deleteRecipe } }) {
      const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
      cache.writeQuery({
        query: GET_ALL_RECIPES,
        data: {
          getAllRecipes: getAllRecipes.filter(recipe => recipe._id !== deleteRecipe._id),
        },
      });
    },
  });

  // Ensure loading and error are defined and handled
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data is defined before accessing it
  const recipes = data ? data.getAllRecipes : [];

  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe({ variables: { id } });
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
          <Fade in timeout={500} style={{ transitionDelay: `${index * 200}ms` }}>
            {/* Attach Recipe ID To Card */}
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }} data-recipe-id={recipe._id}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt={recipe.label}
              />
              <CardContent style={{ flex: '1 0 auto', maxHeight: 250, overflowY: 'auto' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ingredients:
                </Typography>
                <div>
                  {/* Handle Ingredient Overflow */}
                  <ul style={{ maxHeight: 120, overflowY: 'auto', paddingInlineStart: 20 }}>
                    {recipe.ingredientLines.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div style={{ marginTop: 'auto', padding: '10px' }}>
                {/* View Recipe Button */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ minWidth: '100%' }}
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </Button>
                {/* Delete Button */}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ minWidth: '100%', marginBottom: '10px' }}
                  onClick={() => handleDeleteRecipe(recipe._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

export default FavoritesCards;
