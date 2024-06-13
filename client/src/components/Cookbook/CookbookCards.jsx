import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Fade } from '@mui/material';

const CookbookCards = ({ recipes }) => {

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.uri}>
          <Fade in timeout={500} style={{ transitionDelay: `${index * 200}ms` }}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  <ul style={{ maxHeight: 120, overflowY: 'auto', paddingInlineStart: 20 }}>
                    {recipe.ingredientLines.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
              <div style={{ marginTop: 'auto', padding: '10px' }}>
                <Button variant="contained" color="primary" style={{ minWidth: '100%', marginBottom: '10px' }}>
                  Add to Favorites
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
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
