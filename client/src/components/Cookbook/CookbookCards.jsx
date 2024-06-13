import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const CookbookCards = ({ ingredients }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCookbooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/cookbooks`, {
          params: { ingredients: ingredients.join(',') }
        });
        setCookbooks(response.data);
      } catch (error) {
        console.error('Error fetching cookbooks', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (ingredients.length) {
      fetchCookbooks();
    }
  }, [ingredients]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error || !Array.isArray(cookbooks)) {
    return <div>Error: Failed to fetch cookbooks</div>; // Show error message
  }

  return (
    <Grid container spacing={3}>
      {cookbooks.map((cookbook) => (
        <Grid item xs={12} sm={6} md={4} key={cookbook._id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={cookbook.image}
              alt={cookbook.label}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cookbook.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Source: {cookbook.source}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <a href={cookbook.url} target="_blank" rel="noopener noreferrer">
                  Cookbook Link
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CookbookCards;
