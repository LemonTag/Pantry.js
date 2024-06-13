import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

const CookbookCards = ({ recipes }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.uri}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={recipe.image}
              alt={recipe.label}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {recipe.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ingredients:
                <ul>
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </Typography>
              <Button variant="contained" color="primary" style={{ margin: '5px' }}>
                Add to Favorites
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: '5px' }}
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CookbookCards;
