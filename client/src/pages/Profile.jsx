import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Auth from "../utils/auth";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress, // For loading indicators
  Alert, // For error messages
  Box, // For layout
} from '@mui/material';

const Profile = () => {
  // Extract the username from the URL parameters
  const { username } = useParams();

  // Fetch user data using useQuery with the username as a variable
  const { loading, error, data } = useQuery(GET_USER, { variables: { username } });

  // Redirect to personal profile if logged in and username matches
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to='/me' />; // Redirect to '/me' route
  }

  // Display loading indicator while data is being fetched
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress /> {/* Circular progress indicator */}
      </Container>
    );
  }

  // Display error message if data fetching fails
  if (error) {
    return (
      <Container>
        <Alert severity="error">{error.message}</Alert> {/* Display error alert */}
      </Container>
    );
  }

  // Check if user data exists in the response
  if (!data?.user) {
    return (
      <Container>
        <Typography variant="h4">
          You need to be logged in to see this profile. Use the navigation links above to sign up or log in!
        </Typography>
      </Container>
    );
  }

  // Destructure user data for easier access
  const user = data.user;

  // Placeholder for rendering profile content (assuming you have profile data)
  return (
    <Container>
      <Card>
        <CardContent>
          {/* Display user profile information here based on 'user' data */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
