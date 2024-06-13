import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

const CookbookCards = ({ recipes }) => {
  const [visibleCards, setVisibleCards] = useState({});

  // Ref to store each card element
  const cardRefs = useRef([]);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            setVisibleCards((prev) => ({
              ...prev,
              [cardId]: true,
            }));
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the card is visible
    );

    // Observe each card element
    cardRefs.current.forEach((cardRef) => {
      observer.observe(cardRef);
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.uri}>
          <Card
            ref={(el) => (cardRefs.current[index] = el)}
            data-card-id={recipe.uri} // Unique identifier for each card
            style={{
              opacity: visibleCards[recipe.uri] ? 1 : 0, // Apply fade-in effect based on visibility
              transition: 'opacity 0.5s ease-in-out', // Smooth transition
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
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
        </Grid>
      ))}
    </Grid>
  );
};

export default CookbookCards;
