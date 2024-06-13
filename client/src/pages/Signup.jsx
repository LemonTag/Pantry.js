import { useState } from 'react'; // Hook for managing component state

import { Link as RouterLink } from 'react-router-dom'; // Link component for navigation within React Router

import { useMutation } from '@apollo/client'; // Hook for interacting with GraphQL mutations

import { ADD_USER } from '../utils/mutations'; // Import the ADD_USER mutation definition

import Auth from '../utils/auth'; // Utility functions for user authentication

import {
  TextField, // MUI component for text input fields (deprecated for Signup)
  Button, // MUI component for buttons
  Card, // MUI component for card layout
  CardContent, // MUI component for card content area
  CardHeader, // MUI component for card header
  Typography, // MUI component for styled text
  FormControl, // MUI component for form controls
  InputLabel, // MUI component for input labels
  OutlinedInput, // MUI component for outlined input fields
  FormHelperText, // MUI component for helper text
  Box, // MUI component for layout and styling
  Link, // MUI component for links
  Alert, // MUI component for displaying alerts
} from '@mui/material';

const Signup = () => {
  // State to manage signup form data (username, email, password)
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Mutation hook for signup using ADD_USER mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    // Update form state with user input
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState); // For debugging purposes (consider removing in production)

    try {
      const { data } = await addUser({ variables: { ...formState } });
      Auth.login(data.addUser.token); // Login user after successful signup
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Box className="flex-row justify-center mb-4"> {/* Container for signup form layout (likely using CSS classes) */}
      <Card sx={{ width: '100%', maxWidth: 500 }}> {/* Card component for signup form */}
        <CardHeader title="Sign Up"  /> {/* Card header with title */}
        <CardContent> {/* Content area of the card */}
          {data ? (
            <Alert severity="success"> {/* Success message after successful signup */}
              Success! You may now head <Link component={RouterLink} to="/">back to the homepage.</Link>
            </Alert>
          ) : (
            <form onSubmit = {handleFormSubmit}> {/* Form for signup */}
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Username field */}
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  {...register('username', validationSchema.fields.username)} // Use validation schema for username
                  error={errors.username}
                  helperText={errors.username?.message}
                  label="Username"
                  value={formState.username}
                  onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                />
                <FormHelperText sx={{ color: 'error' }}>
                  {errors.username && errors.username.message} {/* Display validation error for username */}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Email field */}
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  {...register('email', validationSchema.fields.email)} // Use validation schema for email
                  error={errors.email}
                  helperText={errors.email?.message}
                  label="Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
                <FormHelperText sx={{ color: 'error' }}>
                  {errors.email && errors.email.message} {/* Display validation error for email */}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Password field */}
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  {...register('password', validationSchema.fields.password)} // Use validation schema for password
                  error={errors.error} // Likely a typo, should be errors.password
                  helperText={errors.password?.message}
                  label="Password"
                  type="password"
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                />
                <FormHelperText sx={{ color: 'error' }}>
                  {errors.password && errors.password.message} {/* Display validation error for password */}
                </FormHelperText>
              </FormControl>
              <Button type="submit" variant="contained" sx={{ width: '100%' }}>
                Submit
              </Button>
            </form>
          )}
          {error && (
            <Alert severity="error">{error.message}</Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
  
};

export default Signup;
