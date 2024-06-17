import React, { useEffect } from 'react';
import AuthService from "../../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Fade } from '@mui/material';
import { GET_ALL_RECIPES } from '../../utils/queries';
import { DELETE_RECIPE } from '../../utils/mutations';

const FavoritesCards = () => {
  const isLoggedIn = AuthService.loggedIn();
  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  const currentUserId = AuthService.getProfile().data._id;

  const { loading, error, data, refetch } = useQuery(GET_ALL_RECIPES, {
    variables: { userId: currentUserId },
  });

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache, { data: { deleteRecipe } }) {
      const { getRecipesByUser } = cache.readQuery({ query: GET_ALL_RECIPES, variables: { userId: currentUserId } });
      cache.writeQuery({
        query: GET_ALL_RECIPES,
        variables: { userId: currentUserId },
        data: {
          getRecipesByUser: getRecipesByUser.filter(recipe => recipe._id !== deleteRecipe._id),
        },
      });
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data ? data.getRecipesByUser : [];

  const handleDeleteRecipe = async (id) => {
    console.log('Deleting recipe with id:', id);
    const variables = { id };
    console.log('Variables:', variables);
    try {
      await deleteRecipe({ variables });
      refetch();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
          <Fade in timeout={500} style={{ transitionDelay: `${index * 200}ms` }}>
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
                <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                  Ingredients:
                </Typography>
                <div>
                  <ul style={{ maxHeight: 120, overflowY: 'auto', paddingInlineStart: 20, color: 'black' }} >
                    {recipe.ingredientLines.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div style={{ marginTop: 'auto', padding: '10px' }}>
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
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ minWidth: '100%', marginBottom: '10px' }}
                  onClick={() => {
                    console.log('Recipe:', recipe);
                    handleDeleteRecipe(recipe._id);
                  }}
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