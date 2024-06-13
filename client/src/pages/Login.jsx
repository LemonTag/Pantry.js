import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import {
  TextField, // MUI component for text input fields
  Button, // MUI component for buttons
  Card, // MUI component for card layout
  CardContent, // MUI component for card content area
  CardHeader, // MUI component for card header
  Typography, // MUI component for styled text
  Alert, // MUI component for displaying alerts
  Box, // MUI component for layout and styling
} from '@mui/material';

const Login = (props) => {
  // State to manage login form data (email and password)
  const [formState, setFormState] = useState({ email: '', password: '' });

  // Mutation hook to handle login with Apollo Client
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Function to update form state based on user input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Function to handle form submission and login mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Execute the LOGIN_USER mutation with form data
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token); // Store the login token
    } catch (e) {
      console.error(e);
    }
    // Clear form state after successful login
    setFormState({ email: '', password: '' });
  };

  return (
    <Box className="flex-row justify-center mb-4">
      {/* Card component for login form layout */}
      <Card sx={{ width: '100%', maxWidth: 500 }}>
        <CardHeader title="Login" /> {/* Card header with title */}
        <CardContent> {/* Card content area */}
          {data ? (
            <Alert severity="success">
              {/* Success message after successful login */}
              Success! You may now head <RouterLink to="/">back to the homepage.</RouterLink>
            </Alert>
          ) : (
            <form onSubmit={handleFormSubmit}>
              {/* Login form with email and password fields */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" sx={{ width: '100%', mt: 2 }}>
                Submit
              </Button>
            </form>
          )}
          {/* Display error message if login fails */}
          {error && <Alert severity="error">{error.message}</Alert>}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
